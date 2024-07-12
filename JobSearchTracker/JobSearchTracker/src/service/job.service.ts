import { Injectable } from '@angular/core';
import { JTSJob } from '../model/job';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class JobService {
public baseUrl ="https://localhost:44335"
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
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get(`${this.baseUrl}/${this.getJobByIDUrl}/${jobID}`, { headers: headers });
  }

  getAllJobs() : Observable<any> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get(`${this.baseUrl}/${this.getAllJobsUrl}`, { headers: headers });
  }

  addJob(job: JTSJob) : Observable<any> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.post(this.addJobUrl, JSON.stringify(job), {headers: headers});
  }

  updateJob(job: JTSJob) : Observable<any> | undefined {
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this._httpClient?.put(`${this.baseUrl}/${this.updateJobUrl}/${job.JobID}`, JSON.stringify(job), httpOptions);
  }
  
  deleteJob(jobID: number) : Observable<any> | undefined {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8')
   .set('Accept', 'application/json');
    return this._httpClient?.delete(`${this.baseUrl}/${this.deleteJobUrl}/${jobID}`, { headers: headers });
  }


}
