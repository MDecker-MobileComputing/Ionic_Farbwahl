import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/**
 * Service-Klasse kapselt Persistenz "ionic-storage"
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
   * @return  Anzahl der Farbcodes, die jetzt gespeichert ist.
   */
  async speichereFarbcode(farbcode: string) {

    await this.storage.set(farbcode, "lorem ipsum");

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


  /*
  async holeAlleFarbcodes() {

     let ergebnisArray = [];

     return ergebnisArray;
  }
  *


  /**
   * Getter für Gesamtanzahl der gespeicherten Farben.
   *
   * @return  Anzahl der aktuell  gespeicherten Farben.
   */
  async getAnzahlGespeicherteFarben() {

    let anzahl = await this.storage.length();

    return anzahl;
  }

}
