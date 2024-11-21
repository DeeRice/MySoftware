import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveNotificationComponent } from './remove-notification.component';
import { ActivatedRoute } from '@angular/router';

describe('RemoveNotificationComponent', () => {
  let component: RemoveNotificationComponent;
  let fixture: ComponentFixture<RemoveNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [RemoveNotificationComponent, ActivatedRoute]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
