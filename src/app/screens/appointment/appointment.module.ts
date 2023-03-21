import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

import { AppointmentService } from './appointment.service';
import { AppointmentMainComponent } from './components/appointment-main/appointment-main.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { AppointmentDialogFormComponent } from './components/appointment-dialog-form/appointment-dialog-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppointmentMainComponent,
    CalendarComponent,
    AppointmentDialogFormComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCardModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatTableModule,
    MatDialogModule,
    NgxMaterialTimepickerModule.setLocale('en-US')
  ],
  providers: [AppointmentService],
})
export class AppointmentModule { }
