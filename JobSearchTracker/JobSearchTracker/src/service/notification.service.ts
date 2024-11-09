import { Injectable } from '@angular/core';
import { JTSNotification } from '../model/notification';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, map, of, Subject } from 'rxjs';

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
  public ViewJobIsSelected: boolean = false;
  public AddJobIsSelected: boolean = false;
  public RemoveJobIsSelected: boolean = false;
  public ViewNotificationIsSelected: boolean = false;
  public SetNotificationIsSelected: boolean = false;
  public RemoveNotificationIsSelected: boolean = false;
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

  public setActiveTab(index:number){
    switch(index){
      case 0: this.ViewJobIsSelected = true;
              this.AddJobIsSelected = false;
              this.RemoveJobIsSelected = false;
              this.ViewNotificationIsSelected = false;
              this.SetNotificationIsSelected = false;
              this.RemoveNotificationIsSelected = false;
              break;
      case 1: this.ViewJobIsSelected = false;
              this.AddJobIsSelected = true;
              this.RemoveJobIsSelected = false;
              this.ViewNotificationIsSelected = false;
              this.SetNotificationIsSelected = false;
              this.RemoveNotificationIsSelected = false;
              break;
      case 2: this.ViewJobIsSelected = false;
              this.AddJobIsSelected = false;
              this.RemoveJobIsSelected = true;
              this.ViewNotificationIsSelected = false;
              this.SetNotificationIsSelected = false;
              this.RemoveNotificationIsSelected = false;
              break;
      case 3: this.ViewJobIsSelected = false;
              this.AddJobIsSelected = false;
              this.RemoveJobIsSelected = false;
              this.ViewNotificationIsSelected = true;
              this.SetNotificationIsSelected = false;
              this.RemoveNotificationIsSelected = false;
              break;
      case 4: this.ViewJobIsSelected = false;
              this.AddJobIsSelected = false;
              this.RemoveJobIsSelected = false;
              this.ViewNotificationIsSelected = false;
              this.SetNotificationIsSelected = true;
              this.RemoveNotificationIsSelected = false;
              break;
      case 5: this.ViewJobIsSelected = false;
              this.AddJobIsSelected = false;
              this.RemoveJobIsSelected = false;
              this.ViewNotificationIsSelected = false;
              this.SetNotificationIsSelected = false;
              this.RemoveNotificationIsSelected = true;
              break;
    }
  }
}
