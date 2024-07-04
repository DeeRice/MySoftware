import { Injectable } from '@angular/core';
import { Notification } from '../model/notification';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public getNotificationByIDUrl: string = "";
  public getAllNotificationsUrl: string = "";
  public addNotificationUrl: string = "";
  public updateNotificationUrl: string = "";
  public deleteNotificationUrl: string = "";
  public _httpClient?: HttpClient;
  constructor(private httpClient: HttpClient) { 
    this._httpClient = httpClient;
  }

  getNotificationByID(notificationID: number) : Observable<any> | undefined {
    let params = new HttpParams().set('notificationID', notificationID);
    return this._httpClient?.get(this.getNotificationByIDUrl, { params: params });
  }

  getAllNotifications() : Observable<any> | undefined {
    return this._httpClient?.get(this.getAllNotificationsUrl);
  }

  addNotification(notification: Notification) : Observable<any> | undefined {
    let params = new HttpParams().set('notification', JSON.stringify(notification));
    return this._httpClient?.post(this.addNotificationUrl, { params: params });
  }

  updateNotification(notification: Notification) : Observable<any> | undefined {
    let params = new HttpParams().set("notificationID", notification.NotificationID)
    .set('notification', JSON.stringify(notification));
    return this._httpClient?.put(this.updateNotificationUrl, { params: params });
  }
  
  deleteNotification(notificationID: number) : Observable<any> | undefined {
    let params = new HttpParams().set('notificationID', notificationID);
    return this._httpClient?.delete(this.deleteNotificationUrl, { params: params });
  }

}
