import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../../appointment.model';
import { AppointmentService } from '../../appointment.service';

@Component({
  selector: 'app-appointment-dialog-form',
  templateUrl: './appointment-dialog-form.component.html',
  styleUrls: ['./appointment-dialog-form.component.css']
})
export class AppointmentDialogFormComponent {

  appointmentForm!: FormGroup;

  appointments: Appointment[] = [];

  selected!: Date | null;

  selectedTime: string = "11:00 AM";

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

      this.headerTitle = "Edit appointment"
      this.editMode = true;

      this.appointmentForm = this.formBuilder.group({
        id: ['', Validators.required],
        title: ['', Validators.required],
        description: [''],
        date: ['', Validators.required]
      });

      let date = new Date(this.data.appointment.date);
      this.selectedTime = `${date.getUTCHours()}:${date.getUTCMinutes()}`

      this.appointmentForm.patchValue({
        id: this.data.appointment.id,
        title: this.data.appointment.title,
        description: this.data.appointment.description,
        date: new Date(this.data.appointment.date)
      });

    } else {

      this.appointmentForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: [''],
        date: ['', Validators.required]
      });

      let date = new Date(this.data.selectedDate)
      this.selectedTime = this.getHourFromTimeString(this.data.hours)
      date.setUTCHours(parseInt(this.selectedTime))
      this.selectedTime = `${date.getUTCHours()}:${date.getUTCMinutes()}`

      this.appointmentForm.patchValue({
        date: date
      });

    }

  }

  getHourFromTimeString(timeString: string): string {
    let hour = parseInt(timeString, 10);
    const isPM = timeString.toLowerCase().endsWith('pm');

    if (hour === 12) {
      hour = isPM ? 12 : 0; // special case for 12:00 PM (noon) and 12:00 AM (midnight)
    } else if (isPM) {
      hour += 12; // convert to 24-hour format for PM times
    }

    return hour.toString();
  }

  onChangeTime(timeSet: string) {
    const currentDate = new Date(`${this.appointmentForm.get('date')?.value}`);
    const newTime = new Date(`0000-01-01 ${timeSet}`);
    currentDate.setUTCHours(newTime.getHours())
    currentDate.setUTCMinutes(newTime.getMinutes())
    console.log(currentDate)
    this.appointmentForm.get('date')?.setValue(currentDate)
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
