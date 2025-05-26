import { Component } from '@angular/core';
import { SpeicherService } from '../speicher.service';
import { Farbe } from '../farbe';


/**
 * Async Werte von ion-storage auf UI darstellen, siehe auch
 * https://www.joshmorony.com/using-asyncawait-syntax-for-promises-in-ionic/
 */
@Component({
  selector: 'app-seite2',
  templateUrl: './seite2.page.html',
  styleUrls: ['./seite2.page.scss'],
  standalone: false
})
export class Seite2Page {

  /**
   * Asynchrone Funktion getAnzahlGespeicherteFarben() liefert Promise zurück,
   * der bei Interpolation in UI durch Pipe "async" aufgelöst werden muss.
   */
  public anzahlFarbenPromise : Promise<number> = Promise.resolve( 0 );

  /** Promise von Array von Farbobjekten. */
  public farbArrayPromise : Promise<Farbe[]> = Promise.resolve( [] );


  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private speicherService: SpeicherService ) {

    this.farbenHolen();
  }


  /**
   * Lifecycle-Methode, die bei (erneuter) Anzeige der Seite aufgerufen wird:
   * Holt die Farben aus dem Speicher-Service.
   */
  ionViewDidEnter() {

    this.farbenHolen();
  }


  /**
   * Methode, die vom Speicher-Service Promises mit der Anzahl der gespeicherten
   * Farben und einen Array von Objekten der Klasse `Farbe` holt.
   */
  private farbenHolen() {

      this.anzahlFarbenPromise = this.speicherService.getAnzahlGespeicherteFarben();
      this.farbArrayPromise    = this.speicherService.holeAlleFarbcodes();
  }

}
