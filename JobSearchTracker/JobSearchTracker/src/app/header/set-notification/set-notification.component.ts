import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../../service/app.service';
import { AddNotificationTable } from '../../../model/add-notification-table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { JTSNotification, JTSNotificationEvent } from 'src/model/notification';
import { NotificationService } from 'src/service/notification.service';

@Component({
  selector: 'app-set-notification',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule],
    providers: [MessageService,ConfirmationService,AppService],
  templateUrl: './set-notification.component.html',
  styleUrl: './set-notification.component.scss'
})
export class SetNotificationComponent {
  public titles?: AddNotificationTable[] = [];
  public _appService?: AppService;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public _notificationService?: NotificationService;
  constructor(private appService: AppService,
    private messageService?: MessageService, private confirmationService?: ConfirmationService,
    private notificationService?: NotificationService
  ) {
    this._appService = appService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
    this._notificationService = notificationService;
  }
  ngOnInit() {
   this.titles = this._appService?.addNotificationTitles;   
  }


 addNotification = new FormGroup({
  RecruiterName: new FormControl(''),
  RecruiterCompanyName: new FormControl(''),
  RecruiterCompanyLocation: new FormControl(''),
  RecruiterPhoneNumber: new FormControl(''),	
  RecruiterCompanyPhoneNumber: new FormControl(''),	
  ClientContactName: new FormControl(''),
  ClientCompanyName: new FormControl(''),
  ClientCompanyLocation: new FormControl(''),
  ClientCompanyPhoneNumber: new FormControl(''),
  NotificationDate: new FormControl(''),
  NotificationEvent: new FormControl(''),
 });
 
 save(form: FormGroup){
 console.log(form);
   this.addNotification = form;
   this.confirm();
 }

 clear() {
   this.addNotification.reset();
 }

 confirm() {
  this._confirmationService?.confirm({
      message: 'Are you sure that you want to add this notification?',
      accept: () => {
          //Actual logic to perform a confirmation
          var notification = new JTSNotification();
          notification.RecruiterName = this.addNotification.controls.RecruiterName.value || undefined;
          notification.RecruiterCompanyName = this.addNotification.controls.RecruiterCompanyName.value || undefined; 
          notification.RecruiterCompanyLocation = this.addNotification.controls.RecruiterCompanyLocation.value || undefined;
          notification.RecruiterPhoneNumber = this.addNotification.controls.RecruiterPhoneNumber.value || undefined;
          notification.RecruiterCompanyPhoneNumber = this.addNotification.controls.RecruiterCompanyPhoneNumber.value || undefined;	
          notification.ClientContactName = this.addNotification.controls.ClientContactName.value || undefined;
          notification.ClientCompanyName = this.addNotification.controls.ClientCompanyName.value || undefined;
          notification.ClientCompanyLocation = this.addNotification.controls.ClientCompanyLocation.value || undefined;
          notification.ClientCompanyPhoneNumber = this.addNotification.controls.ClientCompanyPhoneNumber.value || undefined;
          notification.NotificationDate = new Date(this.addNotification.controls.NotificationDate.value as string) || undefined;
          notification.NotificationEvent = JTSNotificationEvent[this.addNotification.controls.NotificationEvent.value as keyof typeof JTSNotificationEvent];
          this._notificationService?.addNotification(notification)?.subscribe(
            data => this._messageService?.add({severity:'info', summary:'Confirmed', detail:'You have successfully added the notification.'}),
            error => this._messageService?.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to add the notification.'})
          );
      }
  });
}


}
