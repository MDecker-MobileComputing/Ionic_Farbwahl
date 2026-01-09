import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Farbe } from './farbe';


/**
 * Service-Klasse kapselt Persistenz mit "ionic-storage"
 * ( https://ionicframework.com/docs/angular/storage#ionic-storage ).
 * Installation:
 * ```
 * "ionic-storage" Projekt hinzufügen: npm install --save @ionic/storage
 * ```
 * <br><br>
 *
 * Datenstruktur: Farbcode als Hex-String wird als Schlüssel verwendet,
 *                Farbname als Wert.
 */
@Injectable({
  providedIn: 'root'
})
export class SpeicherService {

  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private storage: Storage ) {

    this.storage.create(); // wird ab Ionic 6 für @ionic/storage-angular benötigt!
  }


  /**
   * Methode zum Speichern eines Farbcodes.
   *
   * @param farbcode  Farbcode als Hex-String, der gespeichert werden soll,
   *                  z.B. `#f04c0a`.
   *
   * @param farbname  Vom Benutzer der Farbe gegebener Name, z.B. "himmelblau"
   *                  oder "Hintergrundfarbe für neue Homepage".
   *
   * @return  Anzahl der Farbcodes, die jetzt gespeichert ist.
   */
  async speichereFarbcode( farbe: Farbe ) {

    await this.storage.set( farbe.hexcode, farbe.farbname );

    const anzahlFarben = await this.getAnzahlGespeicherteFarben();

    return anzahlFarben;
  }


  /**
   * Abfrage, ob bestimmter Farbcode schon gespeichert ist.
   *
   * @param farbcode  Farbcode, für den nachgeschaut werden soll,
   *                  ob er schon gespeichert ist.
   *
   * @return  Wenn der Farbcode schon gespeichert ist, dann wird
   *          der Name zurückgegeben; ist der Farbcode noch nicht
   *          gespeichert wird ein leerer String (aber nie null!)
   *          zurückgegeben.
   */
  async istFarbeSchonGespeichert( farbcode: string ) {

    const nameFuerFarbcode = await this.storage.get( farbcode );
    console.log( `nameFarbcode=${nameFuerFarbcode}` );

    if ( nameFuerFarbcode === null ) {

      return "";
    }

    return nameFuerFarbcode;
  }


  /**
   * Methode liefert alle Farbobjekte zurück.
   *
   * @return  Promise auf einen Array von Farbobjekten. Die Farbojekte
   *          haben die beiden Attribute `farbcode` und `farbname`.
   */
  async holeAlleFarbcodes(): Promise<Farbe[]> {

     const ergebnisArray : Farbe[] = [];

     await this.storage.forEach( ( farbname, farbschluessel ) => {

        const farbe = new Farbe( farbschluessel, farbname );
        ergebnisArray.push( farbe );
     });

    ergebnisArray.sort( ( farbe1: Farbe, farbe2: Farbe ) => {

        let farbname1 = farbe1.farbname;
        let farbname2 = farbe2.farbname;

        if ( farbname1 < farbname2 ) { return -1; }
        if ( farbname1 > farbname2 ) { return +1; }

        return 0;
      });

      return ergebnisArray;
  }


  /**
   * Getter für Gesamtanzahl der gespeicherten Farben.
   *
   * @return  Anzahl der aktuell gespeicherten Farben.
   */
   async getAnzahlGespeicherteFarben() : Promise<number> {

    const anzahl = await this.storage.length();

    return anzahl;
  }

}
