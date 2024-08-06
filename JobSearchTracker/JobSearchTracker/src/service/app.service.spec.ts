import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';

describe('JobService', () => {
  let service: AppService;
  notificationTabIsDisabled:Boolean(true);
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getNotificationTabIsDisabled should return boolean', (done: DoneFn) => {
   let disabled:boolean = service?.getNotificationTabIsDisabled();
   expect (typeof(disabled) == typeof(Boolean)).toBe(true);
   done();
  });

});
