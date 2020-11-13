import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarblistePageRoutingModule } from './farbliste-routing.module';

import { FarblistePage } from './farbliste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarblistePageRoutingModule
  ],
  declarations: [FarblistePage]
})
export class FarblistePageModule {}
