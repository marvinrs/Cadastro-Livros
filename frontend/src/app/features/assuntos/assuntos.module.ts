import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssuntosRoutingModule } from './assuntos-routing.module';
import { AssuntoListComponent } from './assunto-list/assunto-list.component';
import { AssuntoFormComponent } from './assunto-form/assunto-form.component';


@NgModule({
  declarations: [
    AssuntoListComponent,
    AssuntoFormComponent
  ],
  imports: [
    CommonModule,
    AssuntosRoutingModule
  ]
})
export class AssuntosModule { }
