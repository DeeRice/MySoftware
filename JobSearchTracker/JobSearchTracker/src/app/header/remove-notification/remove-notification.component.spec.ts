import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveNotificationComponent } from './remove-notification.component';

describe('RemoveNotificationComponent', () => {
  let component: RemoveNotificationComponent;
  let fixture: ComponentFixture<RemoveNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveNotificationComponent]
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
