import { Component, OnInit, EventEmitter, Output, Inject, ViewChild } from '@angular/core';
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
import { error, getJSON } from 'jquery';
import { NotificationService } from 'src/service/notification.service';
import { JTSNotification, JTSNotificationEventType } from 'src/model/notification';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-remove-notification',
  standalone: true,
  imports: [TableModule, InputTextModule, TagModule,
    DropdownModule, MultiSelectModule, ProgressBarModule, ToastModule, ButtonModule,
    SliderModule, FormsModule, FormsModule, RouterModule, CommonModule, ConfirmDialogModule],
  providers: [AppService, NotificationService, TableModule, CommonModule,
    RouterLinkActive, RouterLink, RouterOutlet, PrimeNGConfig, MessageService,
    ConfirmationService, ConfirmDialogModule, JobService],
  templateUrl: './remove-notification.component.html',
  styleUrl: './remove-notification.component.scss'
})
export class RemoveNotificationComponent {
  _notifications!: JTSNotification[];
  _notificationService: NotificationService;
  public _appService?: AppService;
  public _jobService?: JobService;
  public notification?: JTSNotification;
  public _router: any;
  public _routerLink: any;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public currentID: number = -1;
  public lastTableLazyLoadEvent?: TableLazyLoadEvent;
  public messageHeader?: string;
  @ViewChild(HeaderComponent) headerComponent?: HeaderComponent;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private activatedRoute: ActivatedRoute, private router: Router,
    public appService: AppService, jobService: JobService,
    notificationService: NotificationService, private routerLink: RouterLink) {
    this._appService = appService;
    this._notificationService = notificationService;
    this._router = router;
    this._routerLink = routerLink;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
    this._jobService = jobService;
  }
  ngOnInit() {
    this._notificationService.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
      if ((data != null) && (data != undefined) && ((data as JTSNotification[]).length != 0)) {
        this._notifications = JSON.parse(data.toString());
      }
    },
      (error) => {
        this.messageHeader = "Error!"
        let message: string = "Error occured while trying to retrieve a list of jobs. See developer for solution."
        console.log(error);
        this.confirm(message);
      },
      () => {

      });

  }

  remove(id: number) {
    console.log(id);
    this.currentID = id;
    this.messageHeader = "Delete Notification Confirmation"
    let message: string = "Are you sure you want to delete this notification?"
    this.confirm(message);
  }

  confirm(messageToShow: string) {
    this.confirmationService.confirm({
      message: messageToShow,
      header: this.messageHeader,
      icon: 'pi pi-info-circle',
      accept: () => {

        this._notificationService?.deleteNotification(this.currentID)?.subscribe(
          (result: JTSNotification) => {
            // Handle result
            console.log(result);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have successfully added the job.' });
            this.refreshDataGrid(this.lastTableLazyLoadEvent as TableLazyLoadEvent);
            this.headerComponent?.loadHeaders();
            debugger;
            this.notification = JSON.parse(result.toString());
            if (this.notification !== null && this.notification !== undefined) {
              this.notification.Job.NotificationID = 0;
              this._jobService?.editJob(this.notification.Job as JTSJob)?.subscribe((job: JTSJob) => {
                // Handle result
                console.log(result)
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have successfully added the job.' });
                this.headerComponent?.loadHeaders();
              },
                (error) => {
                  this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'A error occurred while trying to add the job.' });
                },
                () => {

                }
              );
            }

          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'A error occurred while trying to add the job.' });
          },
          () => {
            // No errors, route to new page

          }
        );
      }
    });
    this.refreshDataGrid(this.lastTableLazyLoadEvent as TableLazyLoadEvent);
  }

  public async refreshDataGrid(event: TableLazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
      if ((data != null) && (data != undefined) && ((data as JTSNotification[]).length != 0)) {
        this._notifications = JSON.parse(data.toString());
      }

    },
      (error) => {
        this.messageHeader = "Error!"
        let message: string = "Error occured while trying to retrieve a list of jobs. See developer for solution."
        console.log(error);
        this.confirm(message);
      });
  }

  async displayNotificationsForToday() {
    await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
      if ((data != null) && (data != undefined) && (data.length > 0)) {
        this._notifications = JSON.parse(data.toString());
      }
    },
      (error) => {
        this.messageHeader = "Error!"
        let message: string = "Error occured while trying to retrieve a list of jobs. See developer for solution."
        console.log(error);
        this.confirm(message);
      });
  }
  display(num: number) {
    let jtsEvent = JTSNotificationEventType[num];
    return jtsEvent;
  }

  goToDetailPage(id: string) {
    this._appService?.setJobDetailsIsHidden(true);
    this._appService?.setHeaderIsHidden(true);
    this._appService?.setNotificationIsHidden(false);
    this._router.navigate(['/app-notification-details/', id]);
    console.log(id);
  }

}
