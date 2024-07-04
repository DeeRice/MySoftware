import { Injectable } from '@angular/core';
import { Job } from '../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
public getJobByIDUrl: string = "";
public getAllJobsUrl: string = "";
public addJobUrl: string = "";
public updateJobUrl: string = "";
public deleteJobUrl: string = "";
  constructor() { }
  getJobByID(jobID: Number) : Job | null {
    return null;
  }

  getAllJobs() : Job[] | null {
    return null;
  }

  addJob(job: Job) : Number {
    return 1;
  }

  updateJob(job: Job) : Number {
    return 1;
  }
  
  deleteJob(jobID: Number) : Number {
    return 1;
  }


}
