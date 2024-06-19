import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UpdateButtonComponent } from './update-button/update-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';


@NgModule({
  declarations: [
    UpdateButtonComponent,
    DeleteButtonComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
