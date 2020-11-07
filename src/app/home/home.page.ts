import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { SpeicherService } from '../speicher.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** Wert für Rot-Anteil von Farbe (0..255). */
  private rotWert : number = 240;

  /** Wert für Grün-Anteil von Farbe (0..255). */
  private gruenWert : number = 10;

  /** Wert für Balu-Anteil von Farbe (0..255). */
  private blauWert : number = 10;

  /** Hex-Code der aktuelles ausgewählten Farbe. */
  private farbeHexCode : string = "";


  /**
   * Konstruktor für Dependency Injection, führt auch Event-Handler-Methode
   * zur Darstellung aktueller Farbwert aus.
   */
  constructor( private toastController: ToastController,
               private speicherService: SpeicherService,
             ) {

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


  /**
   * Event-Handler-Button
   */
  async onFarbeSpeichernButton() {

    let anzahlGespeichert = await this.speicherService.speichereFarbcode(this.farbeHexCode);

    this.zeigeToast( `Farbcode wurde gespeichert, es sind jetzt ${anzahlGespeichert} Farben gespeichert.` );
  }


  /**
   * Toast anzeigen, siehe auch https://ionicframework.com/docs/api/toast
   */
  async zeigeToast(nachricht: string) {

    const toast =
          await this.toastController.create({ message: nachricht,
                                              duration: 2000
                                            });
    await toast.present();
  }

}
