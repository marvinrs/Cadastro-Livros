import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoresRoutingModule } from './autores-routing.module';
import { AutorListComponent } from './autor-list/autor-list.component';
import { AutorFormComponent } from './autor-form/autor-form.component';


@NgModule({
  declarations: [
    AutorListComponent,
    AutorFormComponent
  ],
  imports: [
    CommonModule,
    AutoresRoutingModule
  ]
})
export class AutoresModule { }
