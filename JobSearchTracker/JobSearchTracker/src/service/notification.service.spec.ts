import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { JTSNotification } from 'src/model/notification';
import { Observable } from 'rxjs';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpClient:HttpClient;
  let notificationID:number = 1;
  let notification:JTSNotification;
  const mockUserService = jasmine.createSpyObj("NotificationService", ["getNotificationByID"]);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NotificationService, HttpClient, HttpHandler]
    })
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(NotificationService);
    service = new NotificationService(httpClient);
    notification = new JTSNotification();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getNotificationByID should return JTSNotification or undefined', (done) => {
    service?.getNotificationByID(notificationID)?.subscribe((value) => {
       expect (typeof(value) == typeof(Observable<JTSNotification>) || typeof(value) == typeof({}) || typeof(value) == undefined ||
       typeof(value) == typeof("string")).toBe(true);
      done();
    });
  });

  it('#getAllNotifications should return JTSNotification[] or undefined', (done) => {
    service?.getAllNotifications()?.subscribe((value) => {
       expect (typeof(value) == typeof(Observable<JTSNotification[]>) || typeof(value) == typeof([]) || typeof(value) == undefined ||
       typeof(value) == typeof("string")).toBe(true);
      done();
    });
  });

  it('#getLastNotificationID should return number or undefined', (done) => {
    service?.getLastNotificationID()?.subscribe((value) => {
       expect (typeof(value) == typeof(Observable<Number>) || typeof(value) == typeof({}) || typeof(value) == undefined ||
       typeof(value) == typeof("string")).toBe(true);
      done();
    });
  });

  it('#addNotification should return JTSNotification or undefined', (done) => {
    service?.addNotification(notification)?.subscribe((value) => {
       expect (typeof(value) == typeof(Observable<JTSNotification>) || typeof(value) == typeof({}) || typeof(value) == undefined
      || typeof(value) == typeof("string")).toBe(true);
      done();
    });
  });

  it('#deleteNotification should return JTSNotification or undefined', (done) => {
    service?.deleteNotification(-1)?.subscribe((value) => {
       expect (typeof(value) == typeof(Observable<JTSNotification>) || typeof(value) == typeof({}) || typeof(value) == undefined
      || typeof(value) == typeof("string")).toBe(true);
      done();
    });
  });

});
