import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  selected!: Date | null;

  constructor(private formBuilder: FormBuilder, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const newAppointment: Appointment = this.appointmentForm.value;
      this.appointmentService.addAppointment(newAppointment).subscribe(() => {
        this.appointmentForm.reset();
      });
    }
  }

  onDateChanged(selectedDate: Date): void {
    this.selected = selectedDate;
    this.appointmentForm.get('date')?.setValue(this.selected)
    console.log(this.appointmentForm.get('date')?.value)
  }

}
