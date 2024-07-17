import { Injectable } from '@angular/core';
import { JTSJob } from '../model/job';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
public baseUrl ="https://localhost:7052"
public getJobByIDUrl: string =  "Job/GetJobByID";
public getAllJobsUrl: string =  "Job/GetAllJobs";
public addJobUrl: string = "Job/AddJob";
public updateJobUrl: string = "Job/UpdateJob";
public deleteJobUrl: string =  "Job/DeleteJob";
public _httpClient?: HttpClient;
public _currentJobID: number = -1;
  constructor(private httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getJobByID(jobID: number, errorMessage?: string) : Observable<any> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get(`${this.baseUrl}/${this.getJobByIDUrl}/${jobID}`, { headers: headers }).pipe(
      catchError(this.handleError<Observable<JTSJob>[]>('getJobByID', [], errorMessage))
    );
  }

  getAllJobs(errorMessage?: string) : Observable<any> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get(`${this.baseUrl}/${this.getAllJobsUrl}`, { headers: headers }).pipe(
      catchError(this.handleError<JTSJob[]>('getAllJobs', [], errorMessage))
    );
  }

  addJob(job: JTSJob, errorMessage?: string) : Observable<any> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.post(this.addJobUrl, JSON.stringify(job), {headers: headers}).pipe(
      catchError(this.handleError<JTSJob[]>('addJob', [], errorMessage))
    );
  }

  updateJob(job: JTSJob, errorMessage?: string) : Observable<any> | undefined {
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this._httpClient?.put(`${this.baseUrl}/${this.updateJobUrl}/${job.JobID}`, JSON.stringify(job), httpOptions).pipe(
      catchError(this.handleError<JTSJob[]>('updateJob', [], errorMessage))
    );
  }
  
  deleteJob(jobID: number, errorMessage?: string) : Observable<any> | undefined {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8')
   .set('Accept', 'application/json');
    return this._httpClient?.delete(`${this.baseUrl}/${this.deleteJobUrl}/${jobID}`, { headers: headers }).pipe(
      catchError(this.handleError<JTSJob[]>('deleteJob', [], errorMessage))
    );
  }

  private handleError<T>(operation = 'operation', result?: T, errorMessage?: string) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      errorMessage = error; // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
