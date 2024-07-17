import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NotificationService } from '../../../service/notification.service'
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { JTSNotification } from 'src/model/notification';

@Component({
  selector: 'app-remove-notification',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule],
   providers: [MessageService, ConfirmationService,  ConfirmDialogModule, ToastModule],
  templateUrl: './remove-notification.component.html',
  styleUrl: './remove-notification.component.scss'
})
export class RemoveNotificationComponent {
 public _notifications!: JTSNotification[];
 public _notificationService?: NotificationService;
 public _messageService?: MessageService;
 public _confirmationService?: ConfirmationService;
 public currentID:number = -1;
  constructor(private notificationService: NotificationService,
    private messageService: MessageService, private confirmationService: ConfirmationService
  ) {
    this._notificationService = notificationService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
  }
  ngOnInit() {
   /* this?.notificationService.getAllNotifications()?.subscribe((data) => {
      this._notifications = data;
  });*/
    this._notifications = [];
  }

remove(id: number){
  console.log(id);
  this.currentID = id;
  confirm();
  }
  
  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this job?',
        accept: () => {
            //Actual logic to perform a confirmation
            this._notificationService?.deleteNotification(this.currentID)?.subscribe(
              data => this._messageService?.add({severity:'info', summary:'Confirmed', detail:'You have successfully removed the notification.'}),
              error => this._messageService?.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to remove the notification.'})
            );
        }
    });
  }
}
