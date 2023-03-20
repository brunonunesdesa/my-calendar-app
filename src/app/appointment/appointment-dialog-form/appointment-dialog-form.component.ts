import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointment.model';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-dialog-form',
  templateUrl: './appointment-dialog-form.component.html',
  styleUrls: ['./appointment-dialog-form.component.css']
})
export class AppointmentDialogFormComponent {

  appointmentForm!: FormGroup;

  appointments: Appointment[] = [];

  selected!: Date | null;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<AppointmentDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required]
    });

    if (this.data) {
      this.appointmentForm.patchValue({
        id: this.data.id,
        title: this.data.title,
        description: this.data.description,
        date: new Date(this.data.date)
      });
    }
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const newAppointment: Appointment = this.appointmentForm.value;
      this.appointmentService.updateAppointment(newAppointment).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  onDelete(): void {
    this.appointmentService.deleteAppointment(this.appointmentForm.get('id')?.value).subscribe(() => {
      this.dialogRef.close();
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
