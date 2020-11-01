import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** Wert für Rot-Anteil von Farbe (0..255). */
  private rotWert   : number = 240;

  /** Wert für Grün-Anteil von Farbe (0..255). */
  private gruenWert : number = 10;

  /** Wert für Balu-Anteil von Farbe (0..255). */
  private blauWert  : number = 10;

  /** Hex-Code der aktuelles ausgewählten Farbe. */
  private farbeHexCode : string = "";

  /**
   * Konstruktor, führt Event-Handler-Methode aus.
   */
  constructor() {

    this.onFarbanteilChanged();
  }


  /**
   * Event-Handler-Methode, die aufgerufen wird, wenn einer der RGB-Farbwerte über
   * eines der "ion-range"-Elemente geändert wird.
   */
  onFarbanteilChanged() {

    const HEX_BASIS_VALUE = 16;

    //console.log(`rot=${this.rotWert}, grün=${this.gruenWert}, blau=${this.blauWert}`);

    let rotHex   = this.rotWert.toString(   HEX_BASIS_VALUE );
    let gruenHex = this.gruenWert.toString( HEX_BASIS_VALUE );
    let blauHex  = this.blauWert.toString(  HEX_BASIS_VALUE );

    // Jeder Hex-Wert muss zweistellig sein
    if (rotHex.length   === 1) { rotHex   = "0" + rotHex;   }
    if (gruenHex.length === 1) { gruenHex = "0" + gruenHex; }
    if (blauHex.length  === 1) { blauHex  = "0" + blauHex;  }

    this.farbeHexCode = "#" + rotHex + gruenHex + blauHex;

    document.body.style.setProperty("--gewaehlte-farbe", this.farbeHexCode);
  }

}
