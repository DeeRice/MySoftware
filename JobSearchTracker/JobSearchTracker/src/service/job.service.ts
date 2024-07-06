import { Injectable } from '@angular/core';
import { JTSJob } from '../model/job';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class JobService {
public getJobByIDUrl: string = "";
public getAllJobsUrl: string = "";
public addJobUrl: string = "";
public updateJobUrl: string = "";
public deleteJobUrl: string = "";
public _httpClient?: HttpClient;
public _currentJobID: number = -1;
  constructor(private httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getJobByID(jobID: number) : Observable<any> | undefined {
    let params = new HttpParams().set('JobID', jobID);
    return this._httpClient?.get(this.getJobByIDUrl, { params: params });
  }

  getAllJobs() : Observable<any> | undefined {
    return this._httpClient?.get(this.getAllJobsUrl);
  }

  addJob(job: JTSJob) : Observable<any> | undefined {
    let params = new HttpParams().set('job', JSON.stringify(job));
    return this._httpClient?.post(this.addJobUrl, { params: params });
  }

  updateJob(job: JTSJob) : Observable<any> | undefined {
    let params = new HttpParams().set("jobID", job.JobID)
    .set('job', JSON.stringify(job));
    return this._httpClient?.put(this.updateJobUrl, { params: params });
  }
  
  deleteJob(jobID: number) : Observable<any> | undefined {
    let params = new HttpParams().set('jobID', jobID);
    return this._httpClient?.delete(this.deleteJobUrl, { params: params });
  }


}
