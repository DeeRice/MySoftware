import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { routes } from '../app.routes';
import { RouterLinkActive, ActivatedRoute, RouterModule, Router, RoutesRecognized, Params } from '@angular/router';
import { JTSJob } from '../../model/job';
import { HeaderComponent } from '../header/header.component';
import { JobService } from '../../service/job.service';
import { debounce, debounceTime, distinctUntilChanged, interval, Observable, ObservableInput, switchMap } from 'rxjs';
import { AppService } from 'src/service/app.service';
import { AddJobTable } from 'src/model/add-job-table';
import { NotificationService } from 'src/service/notification.service';
import { JTSNotification, JTSNotificationEventType } from 'src/model/notification';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-notification-details',
  standalone: true,
  imports: [HeaderComponent, ButtonModule, TableModule, CommonModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService, NotificationService, AppService,
    TableModule, CommonModule, ButtonModule, RouterModule, ConfirmDialogModule],
  templateUrl: './notification-details.component.html',
  styleUrl: './notification-details.component.scss'
})
export class NotificationDetailsComponent {
  public titles?: AddJobTable[] = [];
  public _notificationService?: NotificationService;
  public _appService?: AppService;
  public _router: Router;
  public _route?: ActivatedRoute;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public messageHeader?: string;
  constructor(private activatedRoute: ActivatedRoute,
    public notificationService: NotificationService, appService: AppService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private router: Router) {
    this._notificationService = notificationService;
    this._router = router;
    this._route = activatedRoute;
    this._appService = appService;
    this._confirmationService = this.confirmationService;
    this._messageService = this.messageService;
  }
  public notification!: JTSNotification;
  public notificationDetails!: JTSNotification[];
  notificationID: number = -1;
  async ngOnInit() {
    this.notificationDetails = [];
    this.titles = this._appService?.addJobTitles;
    await this._route?.params.subscribe((data: Params) => {
      if ((data != null) && (data != undefined))
        this.notificationID = parseInt(data["id"]);
    },
      (error) => {
        this.messageHeader = "Error!"
        let message: string = "Error occured while trying to retrieve the params. See developer for solution."
        console.log(error);
        this.confirm(message);
      });
    if (Number.isNaN(this.notificationID) == false) {
      this.notificationService.getNotificationByID(this.notificationID)!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: JTSNotification, index: number) => this.notificationService!.getNotificationByID(this.notificationID) as unknown as ObservableInput<JTSNotification>)).subscribe((data: JTSNotification) => {
        this.notification = JSON.parse(data.toString());
        this.notificationDetails.push(this.notification!);
      },
        (error) => {
          this.messageHeader = "Error!"
          let message: string = "Error occured while trying to retrieve the notification id. See developer for solution."
          console.log(error);
          this.confirm(message);
        });
    }

  }
  convertNumberToNotificationEnum(eventNumber: number | undefined) {
    return JTSNotificationEventType[eventNumber as number];
  }

  goBackToJobGrid() {
    this._router.navigateByUrl("/app-header");
  }

  confirm(messageToShow: string) {
    this.confirmationService?.confirm({
      message: messageToShow,
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }
}
