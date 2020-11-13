import { Component } from '@angular/core';
import { SpeicherService } from '../speicher.service';


@Component({
  selector: 'app-farbliste',
  templateUrl: './farbliste.page.html',
  styleUrls: ['./farbliste.page.scss'],
})
export class FarblistePage {

  constructor(private speicherService: SpeicherService) { 

    console.log("Farbliste initialisiert.");
  }

}
