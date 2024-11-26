import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Indian } from '../model/indian';

@Injectable({
  providedIn: 'root'
})
export class IndianDataServiceService {
  public baseUrl ="";
  public getAllIndiansURL ="";
  public getAllCherokeeIndiansURL ="";
  public getAllChickasawIndiansURL ="";
  public getAllChoctawIndiansURL ="";
  public getAllCreekIndiansURL ="";
  public getAllSeminoleIndiansURL ="";
  public _httpClient?: HttpClient;
  constructor(private httpClient: HttpClient) { 
    this._httpClient = httpClient;
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
