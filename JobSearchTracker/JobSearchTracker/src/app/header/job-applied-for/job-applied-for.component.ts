import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { HttpClientModule, provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { CommonModule, DatePipe, JsonPipe, formatDate } from '@angular/common';
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
import { Confirmation, LazyLoadEvent, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { error, getJSON } from 'jquery';
import { JTSNotification, JTSNotificationEventType } from 'src/model/notification';
import { NotificationService } from 'src/service/notification.service';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';
import moment from 'moment';
import { PaginatorModule } from 'primeng/paginator';


@Component({
    selector: 'app-job-applied-for',
    standalone: true,
    imports: [TableModule, InputTextModule, TagModule,
        DropdownModule, MultiSelectModule, ProgressBarModule, ToastModule, ButtonModule,
        SliderModule, FormsModule, FormsModule, RouterModule, CommonModule, DialogModule, ConfirmDialogModule,
        PaginatorModule],
    providers: [AppService, JobService, TableModule, CommonModule, MessageService,
        RouterLinkActive, RouterLink, RouterOutlet, PrimeNGConfig, DialogModule, DialogService, ConfirmDialogModule, ConfirmationService],
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
  lastTableLazyLoadEvent!: TableLazyLoadEvent;
  _notifications!: JTSNotification[];
  _notificationsToBeDisplay?: JTSNotification[];
  public _messageService?: MessageService;
  public messageHeader?: string;
  @Output() isHiddensChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  _dialogService?: DialogService;
  confirmQueue: Array<Message> = [];
  first = 0;
  rows = 10;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, public dialogService: DialogService,
    public appService: AppService, private messageService: MessageService, private confirmationService: ConfirmationService, PrimeNGConfig: PrimeNGConfig, private notificationService: NotificationService,
    jobService?: JobService, private routerLink?: RouterLink) {
    this._appService = appService;
    this._jobService = jobService;
    this._notificationService = notificationService;
    this._router = router;
    this._routerLink = routerLink;
    this._dialogService = dialogService;
    this._confirmationService = this.confirmationService;
    this._messageService = this.messageService;
  }

  pageChange(event: any) {
    debugger;
    this.first = event.first;
    this.rows = event.rows;
    this.refreshDataGrid(this.lastTableLazyLoadEvent);
}

  async ngOnInit() {
    this._appService!.setNotificationTabIsDisabled(true);
    await this._jobService?.getAllJobs()?.subscribe((data: JTSJob[]) => {
      const substring = "the job";
      const substringTwo = "the notification";
      if(data.toString().includes(substring) || data.toString().includes(substringTwo)){
        this.messageHeader = "Error Occured!"
        let message: string = data.toString();
        this.confirm(message);
      }
      else {
      if (data != null && (data as JTSJob[]).length != 0 && data != undefined) {
        this.jobs = JSON.parse(data.toString());
      }
      if (this.jobs.length >= 1) {
        this._appService!.setNotificationTabIsDisabled(false);
      }
      else {
        this._appService!.setNotificationTabIsDisabled(true);
      }
      this.displayNotificationsForToday();
    }
    });
  }

  goToEditPage(id: string) {
    this._router.navigate(['/app-edit-job/', id]);
    console.log(id);
  }

  goToDetailPage(id: string) {
    this._router.navigate(['/app-job-details/', id]);
    console.log(id);
  }
  public async refreshDataGrid(event: TableLazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    this._appService!.setNotificationTabIsDisabled(true);
    await this._jobService?.getAllJobs()?.subscribe((data: JTSJob[]) => {
      const substring = "the job";
      const substringTwo = "the notification";
      if(data.toString().includes(substring) || data.toString().includes(substringTwo)){
        this.messageHeader = "Error Occured!"
        let message: string = data.toString();
        this.confirm(message);
      }
      else {
      if ((data != null) && (data != undefined) && ((data as JTSJob[]).length != 0)) {
        this.jobs = JSON.parse(data.toString());
      }
      if ((this.jobs != null) && (this.jobs != undefined) && (this.jobs.length >= 1)) {
        this._appService!.setNotificationTabIsDisabled(false);
      }
      else {
        this._appService!.setNotificationTabIsDisabled(true);
      }
      this.displayNotificationsForToday();
     }
    });
  }

  async displayNotificationsForToday() {
    await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
      const substring = "the job";
      const substringTwo = "the notification";
      if(data.toString().includes(substring) || data.toString().includes(substringTwo)){
        this.messageHeader = "Error Occured!"
        let message: string = data.toString();
        this.confirm(message);
      }
      else {
      if ((data != null) && (data != undefined) && (data.length > 0)) {
        this._notifications = JSON.parse(data.toString());
      }
      if ((this._notifications != null) && (this._notifications != undefined) && (this._notifications.length > 0)) {
        this._notificationsToBeDisplay = [];
        this._notifications.forEach((obj, index) => {
         const dateString = new Date(obj.NotificationDate).toISOString();
        
          if (
              moment(dateString, 'ddd MMM DD YYYY').isSame(moment().format('ddd MMM DD YYYY'), 'day')
                  ||
              moment(dateString, 'ddd MMM DD YYYY').isBefore(moment().format('ddd MMM DD YYYY'), 'day')
          ) {
            this._notificationsToBeDisplay?.push(obj);
            let notificationEvt = JTSNotificationEventType[obj.NotificationEvent];
            this.confirmQueue.push({
              severity: 'success',
              summary: notificationEvt,
              detail: obj.Message
            });
          }
        });
        if ((this._notificationsToBeDisplay != null) && (this._notificationsToBeDisplay != undefined) && (this._notificationsToBeDisplay.length > 0)) {
          this._notificationsToBeDisplay.forEach((obj, index) => {
            this._messageService?.add(this.confirmQueue[index] as Message);
          });
        }
      }
     }
    });
  }

 
  confirm(messageToShow: string) {
    this.confirmationService?.confirm({
      header: this.messageHeader,
      message: messageToShow,
      accept: () => {
        //Actual logic to perform a confirmation
       
      }
    });
  }


  setMessageHeader(header: string) {
    switch (header) {
      case "NotSet": this.messageHeader = ""; break;
      case "FollowUpWithEmail": this.messageHeader = "Follow Up With Email Today!"; break;
      case "FollowUpWithPhoneCall": this.messageHeader = "Follow Up With Phone Call Today!"; break;
      case "InterviewIsScheduled": this.messageHeader = "You Have An Interview Today!"; break;
      default: break;
    }
  }
}

