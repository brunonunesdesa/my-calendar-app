import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface CalendarHoursAppointment {
  hour: string;
  events: Appointment[]
}

const ELEMENT_DATA: CalendarHoursAppointment[] = [
  { hour: '12AM', events: [] },
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
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements OnInit {
  appointments: Appointment[] = [];

  displayedColumns: string[] = ['hour', 'events'];
  dataSource = ELEMENT_DATA;

  selectedDate!: Date | null;

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

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.dataSource.forEach((appointment, index) => {
      appointment.events = []
    });

    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;

      this.dataSource.forEach((hour, hourIndex) => {

        this.appointments.forEach((appointment, index) => {

          if (new Date(appointment.date).getUTCHours() === hourIndex) {
            hour.events.push(appointment);
          }

        });

      });

    });
  }

  onDelete(id: number | undefined): void {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.loadAppointments();
    });
  }

  onDateChanged(selectedDate: Date): void {
    this.selectedDate = selectedDate;
    this.appointmentService.getAppointmentsByDate(this.selectedDate.toISOString().substring(0, 10)).subscribe((appointments) => {
      this.appointments = appointments;

      this.dataSource.forEach((appointment, index) => {
        appointment.events = []
      });

      this.dataSource.forEach((hour, hourIndex) => {

        this.appointments.forEach((appointment, index) => {

          if (new Date(appointment.date).getUTCHours() === hourIndex) {
            hour.events.push(appointment);
          }

        });

      });
    })
  }

}
