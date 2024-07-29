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
import { JTSNotification } from 'src/model/notification';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-remove-notification',
  standalone: true,
  imports: [TableModule, InputTextModule, TagModule, 
    DropdownModule, MultiSelectModule, ProgressBarModule, ToastModule, ButtonModule, 
    SliderModule,  FormsModule,FormsModule, RouterModule, CommonModule, ConfirmDialogModule],
  providers: [AppService, NotificationService, TableModule,CommonModule,
    RouterLinkActive,RouterLink, RouterOutlet, PrimeNGConfig, MessageService, 
    ConfirmationService,  ConfirmDialogModule],
  templateUrl: './remove-notification.component.html',
  styleUrl: './remove-notification.component.scss'
})
export class RemoveNotificationComponent {
  _notifications!: JTSNotification[];
  _notificationService: NotificationService;
  public _appService?: AppService;  
  public _router: any;
  public _routerLink: any;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public currentID:number = -1;
  lastTableLazyLoadEvent?: TableLazyLoadEvent;
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, @Inject(ActivatedRoute) activatedRoute: ActivatedRoute, @Inject(Router) router: Router,
  public appService: AppService, PrimeNGConfig: PrimeNGConfig,
   notificationService: NotificationService, @Inject(RouterLink) routerLink?: RouterLink) {
    this._appService = appService;
    this._notificationService = notificationService;
    this._router = router;
    this._routerLink = routerLink;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
  }
  ngOnInit() {
    this._notificationService.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
      if(data != null && (data as JTSNotification[]).length != 0 && data != undefined){
      this._notifications = JSON.parse(data.toString());
      }
  }); 
 
  }

remove(id: number){
  console.log(id);
  this.currentID = id;
  this.confirm();
  }
  
  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
        accept: () => {
  
          this._notificationService?.deleteNotification(this.currentID)?.subscribe(
            (result) => {
              // Handle result
              console.log(result)
            },
            (error) => {
              this.messageService.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to add the job.'});
            },
            () => {
              // No errors, route to new page
              this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have successfully added the job.'})
            }
          );
        }
    });
  }

  public async refreshDataGrid(event: TableLazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
       if(data != null && (data as JTSNotification[]).length != 0 && data != undefined){
         this._notifications = JSON.parse(data.toString());
       }
      
     }); 
  }
}
