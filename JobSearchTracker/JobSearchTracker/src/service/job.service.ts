import { Injectable } from '@angular/core';
import { JTSJob } from '../model/job';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
public baseUrl ="https://localhost:7052"
public getJobByIDUrl: string =  "Job/GetJobByID";
public getAllJobsUrl: string =  "Job/GetAllJobs";
public addJobUrl: string = "Job/CreateJob";
public updateJobUrl: string = "Job/UpdateJob";
public deleteJobUrl: string =  "Job/DeleteJob";
public getLastJobIDUrl: string =  "Job/GetLastJobID";
public _httpClient?: HttpClient;
public _currentJobID: number = -1;
  constructor(private httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getJobByID(jobID: number, errorMessage?: string) :  Observable<JTSJob> | undefined {
    let headers = new HttpHeaders();
    let obj:JTSJob = new JTSJob();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<JTSJob>(`${this.baseUrl}/${this.getJobByIDUrl}/${jobID}`, { headers: headers }).pipe(
      catchError(this.handleError<JTSJob>('getJobByID', obj, errorMessage))
    ).pipe(
      map((response: JTSJob) => response)
    );
  }

  getAllJobs(errorMessage?: string) : Observable<JTSJob[]> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<JTSJob[]>(`${this.baseUrl}/${this.getAllJobsUrl}`, { headers: headers, responseType: 'json' }).pipe(
      catchError(this.handleError<JTSJob[]>('getAllJobs', [], errorMessage))
    ).pipe(
      map((response: JTSJob[]) => response)
    );
  }

  getLastJobID(errorMessage?: string) : Observable<number> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<number>(`${this.baseUrl}/${this.getLastJobIDUrl}`, { headers: headers, responseType: 'json' }).pipe(
      catchError(this.handleError<number>('getLastJobID', -1, errorMessage))
    ).pipe(
      map((response: number) => response)
    );
  }
  addJob(job: JTSJob, errorMessage?: string) :  Observable<JTSJob> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    let obj:JTSJob = new JTSJob();
    debugger;
    return this._httpClient?.post<JTSJob>(`${this.baseUrl}/${this.addJobUrl}`,job, {headers: headers}).pipe(
      catchError(this.handleError<JTSJob>('addJob', obj, errorMessage))
    ).pipe(
      map((response: JTSJob) => response)
    );
  }

  updateJob(job: JTSJob, errorMessage?: string) :  Observable<JTSJob> | undefined {
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    let obj:JTSJob = new JTSJob();
    return this._httpClient?.put<JTSJob>(`${this.baseUrl}/${this.updateJobUrl}/${job.JobID}`, JSON.stringify(job), httpOptions).pipe(
      catchError(this.handleError<JTSJob>('updateJob', obj, errorMessage))
    ).pipe(
      map((response: JTSJob) => response)
    );
  }
  
  deleteJob(jobID: number, errorMessage?: string) :  Observable<JTSJob> | undefined {
    let headers = new HttpHeaders();
    let obj: JTSJob = new JTSJob();
    headers.set('Content-Type', 'application/json; charset=utf-8')
   .set('Accept', 'application/json');
    return this._httpClient?.delete<JTSJob>(`${this.baseUrl}/${this.deleteJobUrl}/${jobID}`, { headers: headers }).pipe(
      catchError(this.handleError<JTSJob>('deleteJob', obj, errorMessage))
    ).pipe(
      map((response: JTSJob) => response)
    );
  }

  private handleError<T>(operation = 'operation', result?: T, errorMessage?: string) {
    return (error: any): Observable<T>  => {
  
      // TODO: send the error to remote logging infrastructure
      errorMessage = error; // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  setCurrentID(id: number){
    this._currentJobID = id;
  }
}
