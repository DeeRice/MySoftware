import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { HttpClientModule, provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
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
import { Observable, Subject } from 'rxjs';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { getJSON } from 'jquery';
import { JTSNotification, JTSNotificationEventType } from 'src/model/notification';
import { NotificationService } from 'src/service/notification.service';
import {Dialog, DialogModule} from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import {DialogService} from 'primeng/dynamicdialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-job-applied-for',
  standalone: true,
  imports: [TableModule, InputTextModule, TagModule, 
    DropdownModule, MultiSelectModule, ProgressBarModule, ToastModule, ButtonModule, 
    SliderModule,  FormsModule,FormsModule, RouterModule, CommonModule, DialogModule, ConfirmDialogModule],
    providers: [AppService, JobService, TableModule,CommonModule, MessageService,
      RouterLinkActive,RouterLink, RouterOutlet, PrimeNGConfig, DialogModule, DialogService, ConfirmDialogModule, ConfirmationService],
  templateUrl: './job-applied-for.component.html',
  styleUrl: './job-applied-for.component.scss'
})

export class JobAppliedForComponent {
    jobs: JTSJob[] = [];
    public _appService?: AppService; 
    public _jobService?: JobService; 
    public _notificationService?: NotificationService;
    public _confirmationService?: ConfirmationService;
    public _router: any;
    public _routerLink: any;
    lastTableLazyLoadEvent?: TableLazyLoadEvent;
    _notifications!: JTSNotification[];
    _notificationsToBeDisplay?: JTSNotification[];
    public _messageService?: MessageService;
    public messageHeader?: string;
    @Output() isHiddensChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    _dialogService?: DialogService;
    constructor(@Inject(ActivatedRoute) activatedRoute: ActivatedRoute, @Inject(Router) router: Router, public dialogService: DialogService,
     public appService: AppService, private messageService: MessageService, private confirmationService: ConfirmationService,  PrimeNGConfig: PrimeNGConfig, private notificationService: NotificationService,
      jobService?: JobService, @Inject(RouterLink) routerLink?: RouterLink) {
        this._appService = appService;
        this._jobService = jobService;
        this._notificationService = notificationService;
        this._router = router;
        this._routerLink = routerLink;
        this._dialogService = dialogService;
        this._confirmationService = this.confirmationService;
        this._messageService = this.messageService;
      }

    async ngOnInit() {
      this._appService!.setNotificationTabIsDisabled(true);
       await this._jobService?.getAllJobs()?.subscribe((data: JTSJob[]) => {
          if(data != null && (data as JTSJob[]).length != 0 && data != undefined){
            this.jobs = JSON.parse(data.toString());
          }
          if(this.jobs.length >= 1){
            this._appService!.setNotificationTabIsDisabled(false);
           }
           else {
            this._appService!.setNotificationTabIsDisabled(true);
           }
          
           this.displayNotificationsForToday();
        }); 
       
       
       
   
    }

    goToDetailPage(id: string) {
      this._appService?.setJobDetailsIsHidden(false);
      this._appService?.setHeaderIsHidden(true);
      this._appService?.setNotificationIsHidden(true);
      this._router.navigate(['/app-job-details/', id]);
      console.log(id);
    }   
   public async refreshDataGrid(event: TableLazyLoadEvent) {
      this.lastTableLazyLoadEvent = event;
      this._appService!.setNotificationTabIsDisabled(true);
      await this._jobService?.getAllJobs()?.subscribe((data: JTSJob[]) => {
         if(data != null && (data as JTSJob[]).length != 0 && data != undefined){
           this.jobs = JSON.parse(data.toString());
         }
         if(this.jobs.length >= 1){
           this._appService!.setNotificationTabIsDisabled(false);
          }
          else {
           this._appService!.setNotificationTabIsDisabled(true);
          }
       }); 
    }

  async displayNotificationsForToday() {
   await   this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
        if(data.length > 0){
          this._notifications = JSON.parse(data.toString());
        }
        if(this._notifications.length > 0) {
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

  setMessageHeader(header: string){
    switch(header){
      case "NotSet": this.messageHeader = ""; break;
      case "FollowUpWithEmail": this.messageHeader = "Follow Up With Email Today!"; break;
      case "FollowUpWithPhoneCall":  this.messageHeader= "Follow Up With Phone Call Today!"; break;
      case "InterviewIsScheduled": this.messageHeader= "You Have An Interview Today!"; break;
      default: break;
    }
  }
}

