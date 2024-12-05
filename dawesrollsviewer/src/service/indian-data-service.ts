import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Indian } from '../model/indian';

@Injectable({
  providedIn: 'root'
})
export class IndianDataService {
  public baseUrl ="https://localhost:7103/DawesRollViewer";
  public getAllIndiansURL ="GetAllIndians";
  public getAllCherokeeIndiansURL ="GetAllCherokeeIndians";
  public getAllChickasawIndiansURL ="GetAllChickasawIndians";
  public getAllChoctawIndiansURL ="GetAllChoctawIndians";
  public getAllCreekIndiansURL ="GetAllCreekIndians";
  public getAllSeminoleIndiansURL ="GetAllSeminoleIndians";
  public getCherokeeIndianByIDUrl ="GetCherokeeIndianByID";
  public getChoctawIndianByIDUrl ="GetChoctawIndianByIDUrl";
  public getChickasawIndianByIDUrl ="GetChickasawIndianByID";
  public getCreekIndianByIDUrl ="GetCreekIndianByID";
  public getSeminoleIndianByIDUrl ="GetSeminoleIndianByID";

  public _httpClient?: HttpClient;
  constructor(private httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getCherokeeIndianByID(jobID: number, errorMessage?: string) :  Observable<Indian> | undefined {
    let headers = new HttpHeaders();
    let obj:Indian = new Indian();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian>(`${this.baseUrl}/${this.getCherokeeIndianByIDUrl}/${jobID}`, { headers: headers }).pipe(
      catchError(this.handleError<Indian>('getCherokeeIndianByID', obj, errorMessage))
    ).pipe(
      map((response: Indian) => response)
    );
  }

  getChoctawIndianByID(indianID: number, errorMessage?: string) :  Observable<Indian> | undefined {
    let headers = new HttpHeaders();
    let obj:Indian = new Indian();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian>(`${this.baseUrl}/${this.getChoctawIndianByIDUrl}/${indianID}`, { headers: headers }).pipe(
      catchError(this.handleError<Indian>('getChoctawIndianByID', obj, errorMessage))
    ).pipe(
      map((response: Indian) => response)
    );
  }

  getChickasawIndianByID(indianID: number, errorMessage?: string) :  Observable<Indian> | undefined {
    let headers = new HttpHeaders();
    let obj:Indian = new Indian();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian>(`${this.baseUrl}/${this.getChickasawIndianByIDUrl}/${indianID}`, { headers: headers }).pipe(
      catchError(this.handleError<Indian>('getChickasawIndianByID', obj, errorMessage))
    ).pipe(
      map((response: Indian) => response)
    );
  }

  getCreekIndianByID(indianID: number, errorMessage?: string) :  Observable<Indian> | undefined {
    let headers = new HttpHeaders();
    let obj:Indian = new Indian();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian>(`${this.baseUrl}/${this.getCreekIndianByIDUrl}/${indianID}`, { headers: headers }).pipe(
      catchError(this.handleError<Indian>('getCreekIndianByID', obj, errorMessage))
    ).pipe(
      map((response: Indian) => response)
    );
  }

  getSeminoleIndianByID(indianID: number, errorMessage?: string) :  Observable<Indian> | undefined {
    let headers = new HttpHeaders();
    let obj:Indian = new Indian();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian>(`${this.baseUrl}/${this.getSeminoleIndianByIDUrl}/${indianID}`, { headers: headers }).pipe(
      catchError(this.handleError<Indian>('getSeminoleIndianByID', obj, errorMessage))
    ).pipe(
      map((response: Indian) => response)
    );
  }

  getAllIndians(errorMessage?: string) : Observable<Indian[]> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian[]>(`${this.baseUrl}/${this.getAllIndiansURL}`, { headers: headers, responseType: 'json' }).pipe(
      catchError(this.handleError<Indian[]>('getAllJobs', [], errorMessage))
    ).pipe(
      map((response: Indian[]) => response)
    );
  }

  getAllCherokeeIndians(errorMessage?: string) : Observable<Indian[]> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian[]>(`${this.baseUrl}/${this.getAllCherokeeIndiansURL}`, { headers: headers, responseType: 'json' }).pipe(
      catchError(this.handleError<Indian[]>('getAllJobs', [], errorMessage))
    ).pipe(
      map((response: Indian[]) => response)
    );
  }

  getAllChickasawIndians(errorMessage?: string) : Observable<Indian[]> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian[]>(`${this.baseUrl}/${this.getAllChickasawIndiansURL}`, { headers: headers, responseType: 'json' }).pipe(
      catchError(this.handleError<Indian[]>('getAllJobs', [], errorMessage))
    ).pipe(
      map((response: Indian[]) => response)
    );
  }

  getAllChoctawIndians(errorMessage?: string) : Observable<Indian[]> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian[]>(`${this.baseUrl}/${this.getAllChoctawIndiansURL}`, { headers: headers, responseType: 'json' }).pipe(
      catchError(this.handleError<Indian[]>('getAllJobs', [], errorMessage))
    ).pipe(
      map((response: Indian[]) => response)
    );
  }

  getAllCreekIndians(errorMessage?: string) : Observable<Indian[]> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian[]>(`${this.baseUrl}/${this.getAllCreekIndiansURL}`, { headers: headers, responseType: 'json' }).pipe(
      catchError(this.handleError<Indian[]>('getAllJobs', [], errorMessage))
    ).pipe(
      map((response: Indian[]) => response)
    );
  }

  getAllSeminoleIndians(errorMessage?: string) : Observable<Indian[]> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<Indian[]>(`${this.baseUrl}/${this.getAllSeminoleIndiansURL}`, { headers: headers, responseType: 'json' }).pipe(
      catchError(this.handleError<Indian[]>('getAllJobs', [], errorMessage))
    ).pipe(
      map((response: Indian[]) => response)
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
}
