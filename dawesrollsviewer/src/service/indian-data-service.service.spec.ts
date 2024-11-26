import { TestBed } from '@angular/core/testing';

import { IndianDataServiceService } from './indian-data-service.service';

describe('IndianDataServiceService', () => {
  let service: IndianDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndianDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
