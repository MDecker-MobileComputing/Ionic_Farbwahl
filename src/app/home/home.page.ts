import { Component } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
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
               private alertController: AlertController,
               private navController  : NavController,
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
   * Event-Handler-Methode für Button zum Speichern der aktuellen Farbe.
   */
  async onFarbeSpeichernButton() {

    let nameVonFarbe = await this.speicherService.istFarbeSchonGespeichert(this.farbeHexCode);

    if (nameVonFarbe.length > 0) {

      this.zeigeToast( `Farbcode kann nicht gespeichert werden, weil er schon unter dem Namen >${nameVonFarbe}< gespeichert ist.` );
      return;
    }

    await this.frageNutzerNachNameFuerFarbe();
  }

  /**
   * Dialog (Alert) öffnen, in dem der Nutzer den Namen eingeben soll, unter dem
   * die Farbe gespeichert wird.
   *
   * Die handler-Funktionen für die beiden Buttons werden mit Pfeilfunktionen
   * () => {...} statt function() {...} definiert, damit "this" auf das
   * Page-Objekt zeigt, siehe auch
   * https://github.com/ionic-team/ionic-framework/issues/13446#issuecomment-345411733
   */
  async frageNutzerNachNameFuerFarbe() {

    const speichernButtonObject = {
      text: "Speichern",
      handler: async (inputWerte) => {

        let farbname = inputWerte.farbname;

        if (farbname !== null) {

          farbname = farbname.trim();
        }

        if (farbname === null || farbname.length === 0) {

          this.zeigeToast(`Kann Farbe nicht unter leerem Namen speichern.`);
          return;
        }

        let anzahl = await this.speicherService.speichereFarbcode(this.farbeHexCode, farbname);

        this.zeigeToast( `Farbcode wurde gespeichert, es sind jetzt insgesamt ${anzahl} Farben gespeichert.` );
      }
    };

    const abbrechenButtonObject = {
      text: "Abbrechen",
      role: "cancel",
      handler: () => {

        this.zeigeToast("Farbe nicht gespeichert.");
      }
    };

    const alert = await
          this.alertController.create({ 
            header: "Name für Farbe",
            message: "Geben Sie den Namen ein, unter dem der Farbcode gespeichert werden soll.",
            backdropDismiss: false,
            inputs: [{ label: "Name:", name: "farbname", type: "text" }],
            buttons: [
              speichernButtonObject, abbrechenButtonObject               
            ]
    });

    await alert.present();
  }


  /**
   * Button-Event-Handler um zur Seite zu gehen, auf der alle gespeicherten Farben angezeigt werden.
   */
  async onGeheZuListe() {

    this.navController.navigateForward("/farbliste");

    console.log("Sollte jetzt auf andere Seite navigiert sein.");
  }


  /**
   * Toast anzeigen, siehe auch https://ionicframework.com/docs/api/toast
   */
  async zeigeToast(nachricht: string) {

    const ANZEIGEDAUER_SEKUNDEN = 2;

    const toast =
          await this.toastController.create({ 
            message: nachricht,
            duration: ANZEIGEDAUER_SEKUNDEN * 1000
          });
    await toast.present();
  }

}
