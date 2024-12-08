import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotificationComponent } from './edit-notification.component';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/service/notification.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('EditNotificationComponent', () => {
  let component: EditNotificationComponent;
  let fixture: ComponentFixture<EditNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [EditNotificationComponent, NotificationService, HttpClient, HttpHandler, {provide: ActivatedRoute, 
        useValue: {
          snapshot: {
            queryParamMap: {
              get(): number {
                return 6;
              }
            }
          }
        }
      } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
