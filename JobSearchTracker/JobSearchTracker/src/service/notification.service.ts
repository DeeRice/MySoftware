import { Injectable } from '@angular/core';
import { JTSNotification } from '../model/notification';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public baseUrl ="https://localhost:44335"
  public getNotificationByIDUrl: string = this.baseUrl + "/Notification/GetNotificationByID";
  public getAllNotificationsUrl: string = this.baseUrl + "/Notification/GetAllNotifications";
  public addNotificationUrl: string = this.baseUrl + "/Notification/AddNotification";
  public updateNotificationUrl: string = this.baseUrl + "/Notification/UpdateNotification";
  public deleteNotificationUrl: string = this.baseUrl + "/Notification/DeleteNotification";
  public _httpClient?: HttpClient;
  constructor(private httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getNotificationByID(notificationID: number, errorMessage?: string) : Observable<any> | undefined {
    let params = new HttpParams().set('notificationID', notificationID);
    return this._httpClient?.get(this.getNotificationByIDUrl, { params: params }).pipe(
      catchError(this.handleError<JTSNotification[]>('getNotificationByID', [], errorMessage))
    );
  }

  getAllNotifications(errorMessage?: string) : Observable<any> | undefined {
    return this._httpClient?.get(this.getAllNotificationsUrl).pipe(
      catchError(this.handleError<JTSNotification[]>('getAllNotifications', [], errorMessage))
    );
  }

  addNotification(notification: JTSNotification, errorMessage?: string) : Observable<any> | undefined {
    let params = new HttpParams().set('notification', JSON.stringify(notification));
    return this._httpClient?.post(this.addNotificationUrl, { params: params }).pipe(
      catchError(this.handleError<JTSNotification[]>('addNotification', [], errorMessage))
    );
  }

  updateNotification(notification: JTSNotification, errorMessage?: string) : Observable<any> | undefined {
    let params = new HttpParams().set("notificationID", notification.NotificationID)
    .set('notification', JSON.stringify(notification));
    return this._httpClient?.put(this.updateNotificationUrl, { params: params }).pipe(
      catchError(this.handleError<JTSNotification[]>('updateNotification', [], errorMessage))
    );
  }
  
  deleteNotification(notificationID: number, errorMessage?: string) : Observable<any> | undefined {
    let params = new HttpParams().set('notificationID', notificationID);
    return this._httpClient?.delete(this.deleteNotificationUrl, { params: params }).pipe(
      catchError(this.handleError<JTSNotification[]>('deleteNotification', [], errorMessage))
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
