import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/**
 * Service-Klasse kapselt Persistenz mit "ionic-storage"
 * ( https://ionicframework.com/docs/angular/storage#ionic-storage ).
 *
 * "ionic-storage" Projekt hinzufügen: npm install --save @ionic/storage
 */
@Injectable({
  providedIn: 'root'
})
export class SpeicherService {

  /**
   * Konstruktor für Dependency Injection.
   */
  constructor(private storage: Storage) { }


  /**
   * Methode zum Speichern eines Farbcodes.
   *
   * @param farbcode  Farbcode als Hex-String, der gespeichert werden soll,
   *                  z.B. #f04c0a.
   *
   * @param farbname  Vom Benutzer der Farbe gegebener Name, z.B. "himmelblau" oder
   *                  "Hintergrundfarbe für neue Homepage".
   *
   * @return  Anzahl der Farbcodes, die jetzt gespeichert ist.
   */
  async speichereFarbcode(farbcode: string, farbname: string) {

    await this.storage.set(farbcode, farbname );

    let anzahlFarben = await this.getAnzahlGespeicherteFarben();

    return anzahlFarben;
  }


  /**
   * Abfrage, ob bestimmter Farbcode schon gespeichert ist.
   *
   * @param farbcode  Farbcode, für den nachgeschaut werden soll, ob er schon gespeichert ist.
   *
   * @return  Wenn der Farbcode schon gespeichert ist, dann wird der Name zurückgegeben; ist
   *          der Farbcode noch nicht gespeichert wird ein leerer String (aber nie null!)
   *          zurückgegeben.
   */
  async istFarbeSchonGespeichert(farbcode: string) {

    let nameFuerFarbcode = await this.storage.get(farbcode);

    console.log(`nameFarbcode=${nameFuerFarbcode}`);

    if (nameFuerFarbcode === null) {

      return "";
    }

    return nameFuerFarbcode;
  }


  /**
   * Methode liefert alle Farbobjekte zurück.
   *
   * @return  Promise auf einen Array von Farbobjekten. Die Farbojekte haben die
   *          beiden Attribute "farbcode" und "farbname".
   */
  async holeAlleFarbcodes() {

     let ergebnisArray = [];

     this.storage.forEach( (farbname, farbschluessel) => {

        let farbObjekt = { farbcode: farbschluessel,
                           farbname: farbname
                         };

        ergebnisArray.push(farbObjekt);
     });


     // Sorting does not work?!?
     ergebnisArray.sort((farbobj1, farbobj2) => {

       let farbname1 = farbobj1.farbname;
       let farbname2 = farbobj2.farbname;

       if (farbname1 < farbname2) { return -1; }
       if (farbname1 > farbname2) { return  1; }

       return 0;
     });

    return ergebnisArray;
  }


  /**
   * Getter für Gesamtanzahl der gespeicherten Farben.
   *
   * @return  Anzahl der aktuell gespeicherten Farben.
   */
   async getAnzahlGespeicherteFarben() {

    let anzahl = await this.storage.length();

    return anzahl;
  }

}
