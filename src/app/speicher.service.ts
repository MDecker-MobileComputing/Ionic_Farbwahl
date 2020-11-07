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

    await this.storage.set(farbcode, "");

    let anzahlFarben = await this.getAnzahlGespeicherteFarben();

    return anzahlFarben;
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
