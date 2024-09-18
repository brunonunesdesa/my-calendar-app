import { Injectable } from '@angular/core';
import { Appointment } from './appointment.model';
import { Observable, of } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private storageKey = 'appointments';
  private appointments: Appointment[] = [];

  constructor() {
    this.loadAppointments();
  }

  private loadAppointments(): void {
    const storedAppointments = localStorage.getItem(this.storageKey);
    if (storedAppointments) {
      this.appointments = JSON.parse(storedAppointments);
    }
  }

  private saveAppointments(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.appointments));
  }

  private generateUniqueId(): string {
    return `${new Date().getTime()}-${Math.floor(Math.random() * 10000)}`;
  }

  getAppointments(): Observable<Appointment[]> {
    return of(this.appointments);
  }

  getAppointmentsByDate(date: string): Observable<Appointment[]> {
    const filteredAppointments = this.appointments.filter(appointment =>
      this.isSameDate(new Date(appointment.date), new Date(date))
    );
    return of(filteredAppointments);
  }

  addAppointment(newAppointment: Appointment): Observable<void> {
    newAppointment.id = this.generateUniqueId(); 
    
    this.appointments.push(newAppointment);
    this.saveAppointments();
    return of(undefined);
  }

  updateAppointment(appointment: Appointment): Observable<void> {
    const index = this.appointments.findIndex(a => a.id === appointment.id);
    if (index !== -1) {
      this.appointments[index] = appointment;
    }
    this.saveAppointments();
    return of(undefined);
  }

  deleteAppointment(id: string): Observable<void> {
    this.appointments = this.appointments.filter(appointment => appointment.id !== id);
    this.saveAppointments();
    return of(undefined);
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getUTCFullYear() === date2.getUTCFullYear() &&
           date1.getUTCMonth() === date2.getUTCMonth() &&
           date1.getUTCDate() === date2.getUTCDate();
  }
}

