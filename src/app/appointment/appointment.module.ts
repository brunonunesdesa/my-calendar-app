import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from '../appointment/appointment-routing.module';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
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
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { AppointmentDialogFormComponent } from './appointment-dialog-form/appointment-dialog-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppointmentFormComponent,
    AppointmentListComponent,
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
    MatDialogModule
  ],
  providers: [AppointmentService],
})
export class AppointmentModule { }
