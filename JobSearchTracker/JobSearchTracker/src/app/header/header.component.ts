import { Component, EventEmitter, OnInit, OnChanges, SimpleChanges, Output, Inject, ViewChild } from '@angular/core';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';
import { SetNotificationComponent } from './set-notification/set-notification.component';
import { RemoveNotificationComponent } from './remove-notification/remove-notification.component';
import { RemoveJobAppliedForComponent } from './remove-job-applied-for/remove-job-applied-for.component';
import { JobAppliedForComponent } from './job-applied-for/job-applied-for.component';
import { AddJobAppliedForComponent } from './add-job-applied-for/add-job-applied-for.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { CommonModule } from '@angular/common';
import { AppService } from '../../service/app.service';
import {FormsModule, ValueChangeEvent } from '@angular/forms';
import { RouterLinkActive, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { JobService } from 'src/service/job.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [JobAppliedForComponent, TabViewModule, SetNotificationComponent,
    RemoveNotificationComponent, RemoveJobAppliedForComponent, AddJobAppliedForComponent,
    ViewNotificationComponent, CommonModule, JobDetailsComponent, FormsModule,
    ConfirmDialogModule],
  providers: [MessageService, ConfirmationService, AppService, NgbModal, AppService, RouterModule, RouterOutlet, 
    TabViewModule,ConfirmDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
 isHidden?: boolean;
 notificationsIsDisabled = true;
 lastJobID?: number = -1;
 public _appService?: AppService;
 public _jobService?: JobService;
 public _messageService?: MessageService;
 public _confirmationService?: ConfirmationService;
 public messageHeader?: string;
 @ViewChild(JobAppliedForComponent) jobAppliedForComponent?:JobAppliedForComponent;
 @ViewChild(RemoveJobAppliedForComponent) removeJobAppliedForComponent?: RemoveJobAppliedForComponent;
 @ViewChild(ViewNotificationComponent) viewNotificationComponent?:ViewNotificationComponent;
 @ViewChild(RemoveNotificationComponent) removeNotificationComponent?: RemoveNotificationComponent;
  constructor( @Inject(ActivatedRoute) activatedRoute: ActivatedRoute, public appService: AppService, 
  private messageService: MessageService, private confirmationService: ConfirmationService,
  jobService: JobService) {
        this._appService = appService;
        this.isHidden = this._appService.headerIsHidden;
        this._jobService = jobService;
        this._confirmationService = this.confirmationService;
        this._messageService = this.messageService;
  }
  ngOnInit(){

    this.notificationsIsDisabled = this.appService.getNotificationTabIsDisabled();
     this._jobService!.getLastJobID()?.subscribe((jobID: number) => {
       this.lastJobID = jobID;
       if(jobID != null && jobID >= 1 && jobID != undefined){
        this.notificationsIsDisabled = false;
        this._appService!.setNotificationTabIsDisabled(this.notificationsIsDisabled);
       }
       else {
        this.notificationsIsDisabled = true;
        this._appService!.setNotificationTabIsDisabled(this.notificationsIsDisabled);
       }
     },
     (error) => {
      this.messageHeader = "Error!"
      let message:string = "Error occured while trying to retrieve the last job. See developer for solution."
      console.log(error);
      this.confirm(message);
     });
  }
  public hide(){
    this.hide();
  }
  handleChange(event: TabViewChangeEvent){
     this.jobAppliedForComponent?.refreshDataGrid(this.jobAppliedForComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
     this.removeJobAppliedForComponent?.refreshDataGrid(this.removeJobAppliedForComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
     this.viewNotificationComponent?.refreshDataGrid(this.viewNotificationComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
     this.removeNotificationComponent?.refreshDataGrid(this.removeNotificationComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
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
