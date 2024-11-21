import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetNotificationComponent } from './set-notification.component';
import { HeaderComponent } from '../header.component';
import { forwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SetNotificationComponent', () => {
  let notificationComponent: SetNotificationComponent;
  let notificationFixture: ComponentFixture<SetNotificationComponent>;
  let headerComponent: HeaderComponent;
  let headerFixture: ComponentFixture<HeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SetNotificationComponent, HttpClient, HttpHandler, {provide: ActivatedRoute, 
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
    headerFixture = TestBed.createComponent(HeaderComponent);
    headerComponent = headerFixture.componentInstance;
    headerFixture.detectChanges();
    notificationFixture = TestBed.createComponent(SetNotificationComponent);
    notificationComponent = notificationFixture.componentInstance;
    notificationFixture.detectChanges();
    
  });

  it('should create', () => {
    expect(notificationComponent).toBeTruthy();
  });
});
