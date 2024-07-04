import { Injectable } from '@angular/core';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public getNotificationByIDUrl: string = "";
  public getAllNotificationsUrl: string = "";
  public addNotificationUrl: string = "";
  public updateNotificationUrl: string = "";
  public deleteNotificationUrl: string = "";
  constructor() { }

  getNotificationByID(notificationID: Number) : Notification | null {
    return null;
  }

  getAllNotifications() : Notification [] | null {
    return null;
  }

  addNotification(notification: Notification) : Number {
    return 1;
  }

  updateNotification(notification: Notification) : Number {
    return 1;
  }
  
  deleteNotification(notificationID: Number) : Number {
    return 1;
  }

}
