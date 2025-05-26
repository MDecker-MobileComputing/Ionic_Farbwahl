import { Component } from '@angular/core';
import { LowerUpperWerte } from '../LowerUpperWerte';


/**
 * Seite für Demo <ion-range> mit zwei Slidern.
 */
@Component({
  selector: 'app-seite3',
  templateUrl: './seite3.page.html',
  styleUrls: ['./seite3.page.scss'],
  standalone: false
})
export class Seite3Page {

  public zweiWerte: LowerUpperWerte = { lower: 10,
                                        upper: 90 };
}
