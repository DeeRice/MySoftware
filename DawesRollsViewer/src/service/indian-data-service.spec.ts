import { TestBed } from '@angular/core/testing';

import { IndianDataService } from './indian-data-service';

describe('IndianDataService', () => {
  let service: IndianDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndianDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
