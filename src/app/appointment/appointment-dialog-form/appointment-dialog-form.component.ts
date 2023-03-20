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

  headerTitle: string = "New appointment";

  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<AppointmentDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data.editMode) {
      this.appointmentForm = this.formBuilder.group({
        id: ['', Validators.required],
        title: ['', Validators.required],
        description: [''],
        date: ['', Validators.required]
      });

      this.appointmentForm.patchValue({
        id: this.data.appointment.id,
        title: this.data.appointment.title,
        description: this.data.appointment.description,
        date: new Date(this.data.appointment.date)
      });

      this.headerTitle = "Edit appointment"
      this.editMode = true;
    } else {
      this.appointmentForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: [''],
        date: ['', Validators.required]
      });
      console.log(this.data.selectedDate)
      this.appointmentForm.patchValue({
        date: new Date(this.data.selectedDate)
      });
    }

  }

  onSubmit() {
    console.log(this.appointmentForm.valid)
    if (this.appointmentForm.valid) {
      const newAppointment: Appointment = this.appointmentForm.value;

      if (this.editMode) {
        this.appointmentService.updateAppointment(newAppointment).subscribe(() => {
          this.dialogRef.close();
        });
      } else {
        this.appointmentService.addAppointment(newAppointment).subscribe(() => {
          this.dialogRef.close();
        });
      }

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
