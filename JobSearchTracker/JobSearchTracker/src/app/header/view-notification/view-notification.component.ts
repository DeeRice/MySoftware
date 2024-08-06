import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { HttpClientModule, provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive, ActivatedRoute, RouterModule, RouterLink, Router, RouterOutlet } from '@angular/router';
import { AppService } from '../../../service/app.service';
import { JobService } from 'src/service/job.service';
import { JTSJob } from 'src/model/job';
import { Observable } from 'rxjs';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { getJSON } from 'jquery';
import { NotificationService } from 'src/service/notification.service';
import { JTSNotification, JTSNotificationEventType } from 'src/model/notification';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@Component({
  selector: 'app-view-notification',
  standalone: true,
  imports: [TableModule, InputTextModule, TagModule, 
    DropdownModule, MultiSelectModule, ProgressBarModule, ToastModule, ButtonModule, 
    SliderModule,  FormsModule,FormsModule, RouterModule, CommonModule, ConfirmDialogModule],
  providers: [AppService, NotificationService, TableModule,CommonModule,
    RouterLinkActive,RouterLink, RouterOutlet, PrimeNGConfig, ConfirmDialogModule, ConfirmationService, 
    MessageService],
  templateUrl: './view-notification.component.html',
  styleUrl: './view-notification.component.scss'
})

export class ViewNotificationComponent {
  _notifications!: JTSNotification[];
  _notificationService: NotificationService;
  public _appService?: AppService;  
  public _router: any;
  public _routerLink: any;
  public lastTableLazyLoadEvent?: TableLazyLoadEvent;
  _notificationsToBeDisplay?: JTSNotification[];
  public _confirmationService?: ConfirmationService;
  public _messageService?: MessageService;
  public messageHeader?: string;
  constructor(@Inject(ActivatedRoute) activatedRoute: ActivatedRoute, @Inject(Router) router: Router,
  public messageService: MessageService,
  public appService: AppService, PrimeNGConfig: PrimeNGConfig, public confirmationService: ConfirmationService,
   notificationService: NotificationService, @Inject(RouterLink) routerLink?: RouterLink) {
    this._appService = appService;
    this._notificationService = notificationService;
    this._router = router;
    this._routerLink = routerLink;
    this._confirmationService = confirmationService;
    this._messageService = messageService;
  }
  ngOnInit() {
   this._notificationService.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
    if((data != null) && (data != undefined) && (data.length > 0)){
      this._notifications = JSON.parse(data.toString());
    }
    }); 
    this.displayNotificationsForToday();
    //  this.refreshDataGrid(this.lastTableLazyLoadEvent as TableLazyLoadEvent);
    
}

goToDetailPage(id: string) {
  this._appService?.setJobDetailsIsHidden(true);
  this._appService?.setHeaderIsHidden(true);
  this._appService?.setNotificationIsHidden(false);
  this._router.navigate(['/app-notification-details/', id]);
  console.log(id);
}   

public async refreshDataGrid(event: TableLazyLoadEvent) {
  this.lastTableLazyLoadEvent = event;
  await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
     if((data != null) && (data != undefined) && ((data as JTSNotification[]).length != 0)){
       this._notifications = JSON.parse(data.toString());
     }
    
   }); 
}

async displayNotificationsForToday() {
  await   this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
       if((data != null) && (data != undefined) && (data.length > 0)){
         this._notifications = JSON.parse(data.toString());
       }
       if((this._notifications != null) && (this._notifications != undefined) && (this._notifications.length > 0)) {
         this._notificationsToBeDisplay = [];
         this._notifications.forEach((obj, index)=>{
         
           if(new Date(obj.NotificationDate).toLocaleDateString("mmddyyyy")  == new Date(Date.now()).toLocaleDateString("mmddyyyy") ) {
            this._notificationsToBeDisplay?.push(obj)
           }
         });
         this._notificationsToBeDisplay.forEach((obj, index)=> {
           let notificationEvt = JTSNotificationEventType[obj.NotificationEvent];
           this.setMessageHeader(notificationEvt);
           this.confirm(obj.Message);
         });
       }
     }); 

   }

confirm(messageToShow: string) {
   this.confirmationService?.confirm({
         message: messageToShow,
         accept: () => {
             //Actual logic to perform a confirmation
         }
     });
 }

 goToEditPage(id: string) {
  this._appService?.setJobDetailsIsHidden(false);
  this._appService?.setHeaderIsHidden(true);
  this._appService?.setNotificationIsHidden(true);
  this._router.navigate(['/app-edit-notification/', id]);
  console.log(id);
}  

 setMessageHeader(header: string){
   switch(header){
     case "NotSet": this.messageHeader = ""; break;
     case "FollowUpWithEmail": this.messageHeader = "Follow Up With Email Today!"; break;
     case "FollowUpWithPhoneCall":  this.messageHeader= "Follow Up With Phone Call Today!"; break;
     case "InterviewIsScheduled": this.messageHeader= "You Have An Interview Today!"; break;
     default: break;
   }
 }

display(num: number){
  let jtsEvent = JTSNotificationEventType[num];
  return jtsEvent;
}
}