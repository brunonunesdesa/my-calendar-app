import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentMainComponent } from './components/appointment-main/appointment-main.component';

const routes: Routes = [
  { path: 'calendar', component: AppointmentMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }