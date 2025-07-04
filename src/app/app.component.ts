import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  /**
   * Konstruktor für *Dependency Injection*.
   */
  constructor( private menuController: MenuController ) {}


  /**
   * Event-Handler-Methode für Schließen des Hamburger-Menüs.
   */
  public onMenuSchliessen() {

    this.menuController.close();
  }

}
