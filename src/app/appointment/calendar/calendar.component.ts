import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  selectedDate: Date = new Date();
  @Output() dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  onDateSelected(event: any): void {
    this.selectedDate = new Date(event);
    this.dateChanged.emit(this.selectedDate);
  }
} 