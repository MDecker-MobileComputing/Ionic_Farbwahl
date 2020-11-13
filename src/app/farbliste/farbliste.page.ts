import { Component } from '@angular/core';
import { SpeicherService } from '../speicher.service';


/**
 * Async Werte von ion-storage auf UI darstellen, siehe auch
 * https://www.joshmorony.com/using-asyncawait-syntax-for-promises-in-ionic/
 */
@Component({
  selector: 'app-farbliste',
  templateUrl: './farbliste.page.html',
  styleUrls: ['./farbliste.page.scss'],
})
export class FarblistePage {

  /**
   * Asynchrone Funktion getAnzahlGespeicherteFarben() liefert Promise zurück, der bei Interpolation
   * in UI durch Pipe "async" aufgelöst werden muss.
   */
  private anzahlFarbenPromise : any;

  /** Promise von Array von Farbobjekten. */
  private farbArrayPromise : any;


  /**
   * Konstruktor für Dependency Injection.
   */
  constructor(private speicherService: SpeicherService) {

    this.anzahlFarbenPromise = this.speicherService.getAnzahlGespeicherteFarben();

    this.speicherService.holeAlleFarbcodes().then( (promiseResolved) => {

      this.farbArrayPromise = promiseResolved;
    });
  }

}
