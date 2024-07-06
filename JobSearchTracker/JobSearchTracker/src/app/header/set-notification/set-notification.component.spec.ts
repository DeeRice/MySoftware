import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNotificationComponent } from './set-notification.component';

describe('SetNotificationComponent', () => {
  let component: SetNotificationComponent;
  let fixture: ComponentFixture<SetNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
