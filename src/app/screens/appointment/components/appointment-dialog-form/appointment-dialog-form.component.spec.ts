import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDialogFormComponent } from './appointment-dialog-form.component';

describe('AppointmentDialogFormComponent', () => {
  let component: AppointmentDialogFormComponent;
  let fixture: ComponentFixture<AppointmentDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDialogFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
