import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotificationComponent } from './view-notification.component';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/service/notification.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ViewNotificationComponent', () => {
  let component: ViewNotificationComponent;
  let fixture: ComponentFixture<ViewNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ViewNotificationComponent, NotificationService, HttpClient, HttpHandler, {provide: ActivatedRoute, 
        useValue: {
          snapshot: {
            queryParamMap: {
              get(): number {
                return 6;
              }
            }
          }
        }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
