import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { JTSNotification } from 'src/model/notification';
import { NotificationService } from 'src/service/notification.service';

@Component({
  selector: 'app-view-notification',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  providers: [NotificationService],
  templateUrl: './view-notification.component.html',
  styleUrl: './view-notification.component.scss'
})

export class ViewNotificationComponent {
  _notifications!: JTSNotification[];
  _notificationService!: NotificationService;
  constructor(private notificationService: NotificationService) {
    this._notificationService = notificationService;
  }
  ngOnInit() {
   /* this._notificationService.getAllNotifications()?.subscribe((data) => {
        this._notifications = data;
    }); */
    this._notifications = [];
}
}