import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../appointment.model';
import { AppointmentService } from '../../appointment.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogFormComponent } from '../appointment-dialog-form/appointment-dialog-form.component';

export interface CalendarHoursAppointment {
  hour: string;
  events: Appointment[]
}

const ELEMENT_DATA: CalendarHoursAppointment[] = [
  { hour: '0AM', events: [] },
  { hour: '1AM', events: [] },
  { hour: '2AM', events: [] },
  { hour: '3AM', events: [] },
  { hour: '4AM', events: [] },
  { hour: '5AM', events: [] },
  { hour: '6AM', events: [] },
  { hour: '7AM', events: [] },
  { hour: '8AM', events: [] },
  { hour: '9AM', events: [] },
  { hour: '10AM', events: [] },
  { hour: '11AM', events: [] },
  { hour: '12PM', events: [] },
  { hour: '1PM', events: [] },
  { hour: '2PM', events: [] },
  { hour: '3PM', events: [] },
  { hour: '4PM', events: [] },
  { hour: '5PM', events: [] },
  { hour: '6PM', events: [] },
  { hour: '7PM', events: [] },
  { hour: '8PM', events: [] },
  { hour: '9PM', events: [] },
  { hour: '10PM', events: [] },
  { hour: '11PM', events: [] },
];

@Component({
  selector: 'app-appointment-main',
  templateUrl: './appointment-main.component.html',
  styleUrls: ['./appointment-main.component.css']
})

export class AppointmentMainComponent implements OnInit {
  appointments: Appointment[] = [];

  displayedColumns: string[] = ['hour', 'events'];
  dataSource = ELEMENT_DATA;

  selectedDate: Date = new Date();

  constructor(private appointmentService: AppointmentService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadAppointments(this.selectedDate);
  }

  drop(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      event.container.data.forEach((appointment: Appointment) => {
        appointment.date = new Date(appointment.date)
        appointment.date.setUTCHours(parseInt(event.container.id.substring(event.container.id.lastIndexOf("-") + 1)))
        this.appointmentService.updateAppointment(appointment).subscribe()
      })

    }

  }

  loadAppointments(selectedDate: Date): void {
    this.appointmentService.getAppointmentsByDate(selectedDate.toISOString().substring(0, 10)).subscribe((appointments: Appointment[]) => {
      this.appointments = appointments;
  
      this.dataSource.forEach((hour) => {
        hour.events = [];
      });
  
      this.dataSource.forEach((hour, hourIndex) => {
  
        this.appointments.forEach((appointment) => {
          const appointmentDate = new Date(appointment.date);
  
          if (this.isSameDate(appointmentDate, selectedDate) && appointmentDate.getUTCHours() === hourIndex) {
            hour.events.push(appointment);
          }
  
        });
  
      });
  
    });
  }
  
  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
           date1.getUTCMonth() === date2.getUTCMonth() &&
           date1.getUTCDate() === date2.getUTCDate();
  }

  onDateChanged(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.loadAppointments(selectedDate);
  }

  openDialog(appointment: Appointment | undefined, selectedDate: Date | undefined, editMode: boolean, hours: string | undefined): void {
    let dialogRef
    if (editMode) {
      dialogRef = this.dialog.open(AppointmentDialogFormComponent, {
        data: {
          appointment,
          editMode
        }
      });
    } else {
      dialogRef = this.dialog.open(AppointmentDialogFormComponent, {
        data: {
          selectedDate,
          editMode,
          hours
        }
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      this.loadAppointments(this.selectedDate);
    });
  }

}
