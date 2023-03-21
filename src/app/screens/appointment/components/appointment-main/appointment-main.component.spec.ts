import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentMainComponent } from './appointment-main.component';

describe('AppointmentMainComponent', () => {
  let component: AppointmentMainComponent;
  let fixture: ComponentFixture<AppointmentMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
