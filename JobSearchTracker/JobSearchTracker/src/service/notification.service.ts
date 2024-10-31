import { Injectable } from '@angular/core';
import { JTSNotification } from '../model/notification';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public baseUrl ="https://localhost:7052"
  public getNotificationByIDUrl: string = "Notification/GetNotificationByID";
  public getAllNotificationsUrl: string =  "Notification/GetAllNotifications";
  public addNotificationUrl: string = "Notification/CreateNotification";
  public editNotificationUrl: string =  "Notification/EditNotification";
  public deleteNotificationUrl: string =  "Notification/DeleteNotification";
  public getLastNotificationIDUrl: string =  "Notification/GetLastNotificationID";
  public _httpClient?: HttpClient;
  constructor(private httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getNotificationByID(notificationID: number, errorMessage?: string) : Observable<JTSNotification> | undefined {
    let params = new HttpParams().set('notificationID', notificationID);
    let obj: JTSNotification = new JTSNotification();
    return this._httpClient?.get<JTSNotification>(`${this.baseUrl}/${this.getNotificationByIDUrl}`, { params: params }).pipe(
      catchError(this.handleError<JTSNotification>('getNotificationByID', obj, errorMessage))
    ).pipe(
      map((response: JTSNotification) => response)
    );
  }

  getAllNotifications(errorMessage?: string) : Observable<JTSNotification[]> | undefined {
    return this._httpClient?.get<JTSNotification[]>(`${this.baseUrl}/${this.getAllNotificationsUrl}`).pipe(
      catchError(this.handleError<JTSNotification[]>('getAllNotifications', [], errorMessage))
    ).pipe(
      map((response: JTSNotification[]) => response)
    );
  }

  getLastNotificationID(errorMessage?: string) : Observable<number> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.get<number>(`${this.baseUrl}/${this.getLastNotificationIDUrl}`, { headers: headers, responseType: 'json' }).pipe(
      catchError(this.handleError<number>('getLastNotificationID', -1, errorMessage))
    ).pipe(
      map((response: number) => response)
    );
  }
  addNotification(notification: JTSNotification, errorMessage?: string) : Observable<JTSNotification> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.post<JTSNotification>(`${this.baseUrl}/${this.addNotificationUrl}`, JSON.stringify(notification), {headers: headers}).pipe(
      catchError(this.handleError<JTSNotification>('addNotification', notification, errorMessage))
    ).pipe(
      map((response: JTSNotification) => response)
    );
  }

  editNotification(notification: JTSNotification, errorMessage?: string) : Observable<JTSNotification> | undefined {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');
    return this._httpClient?.put<JTSNotification>(`${this.baseUrl}/${this.editNotificationUrl}`, JSON.stringify(notification), {headers: headers}).pipe(
      catchError(this.handleError<JTSNotification>('editNotification', notification, errorMessage))
    ).pipe(
      map((response: JTSNotification) => response)
    );
  }
  
  deleteNotification(notificationID: number, errorMessage?: string) : Observable<JTSNotification> | undefined {
    let params = new HttpParams().set('notificationID', notificationID);
    let obj: JTSNotification = new JTSNotification();
    return this._httpClient?.delete<JTSNotification>(`${this.baseUrl}/${this.deleteNotificationUrl}`, { params: params }).pipe(
      catchError(this.handleError<JTSNotification>('deleteNotification', obj, errorMessage))
    ).pipe(
      map((response: JTSNotification) => response)
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
