import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  appointmentForm!: FormGroup;

  appointments: Appointment[] = [];

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required]
    });

    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const newAppointment: Appointment = this.appointmentForm.value;
      this.appointmentService.addAppointment(newAppointment).subscribe(() => {
        this.appointmentForm.reset();
        this.loadAppointments();
      });
    }
  }

  onDelete(id: number | undefined): void {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      this.loadAppointments();
    });
  }

}
