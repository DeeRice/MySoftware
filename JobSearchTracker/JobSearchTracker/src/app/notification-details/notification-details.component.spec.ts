import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDetailsComponent } from './notification-details.component';
import { ActivatedRoute } from '@angular/router';

describe('NotificationDetailsComponent', () => {
  let component: NotificationDetailsComponent;
  let fixture: ComponentFixture<NotificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NotificationDetailsComponent, ActivatedRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
