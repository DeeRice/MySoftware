import { TestBed } from '@angular/core/testing';

import { JobService } from './job.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JTSJob } from 'src/model/job';

describe('JobService', () => {
  let service: JobService;
  let httpClient:HttpClient;
  let jobID:number = 1;
  let job:JTSJob;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [JobService, HttpClient, HttpHandler]
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(JobService);
    service = new JobService(httpClient);
    job = new JTSJob();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getJobByID should return JTSJob or undefined', (done) => {
    service?.getJobByID(jobID)?.subscribe((value) => {
       expect (typeof(value) == typeof(Observable<JTSJob>) || typeof(value) == undefined ||
       typeof(value) == typeof(JTSJob) || typeof(value) == typeof({}) ||
       typeof(value) == typeof("string")).toBe(true);
      done();
    });
  });

  it('#getAllJobs should return JTSJob[] or undefined', (done) => {
    service?.getAllJobs()?.subscribe((value) => {
       expect (typeof(value) == typeof(Observable<JTSJob[]>) || typeof(value) == undefined ||
       typeof(value) == typeof(Array<JTSJob>) ||  typeof(value) == typeof([]) ||
       typeof(value) == typeof("string")).toBe(true);
      done();
    });
  });

  it('#getLastJobID should return number or undefined', (done) => {
    service?.getLastJobID()?.subscribe((value) => {
       expect (typeof(value) == typeof(Observable<Number>) || typeof(value) == undefined || 
       Number.isInteger(value) ||
       typeof(value) == typeof("string")).toBe(true);
      done();
    });
  });

  it('#addJob should return JTSJob or undefined', (done) => {
    service?.addJob(job)?.subscribe((value) => {
      debugger;
       expect (value).toBeDefined();
      done();
    });
  });

  it('#deleteJob should return JTSJob or undefined', (done) => {
    service?.deleteJob(-1)?.subscribe((value) => {
      debugger;
       expect (value).toBeDefined();
      done();
    });
  });


});
