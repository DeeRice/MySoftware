import { Component, EventEmitter, OnInit, OnChanges, SimpleChanges, Output, Inject, ViewChild, Injectable, ChangeDetectorRef, Input } from '@angular/core';
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
import { FormGroup, FormsModule, ValueChangeEvent } from '@angular/forms';
import { RouterLinkActive, ActivatedRoute, RouterModule, RouterOutlet, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { JobService } from 'src/service/job.service';
import { TableLazyLoadEvent } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditJobComponent } from '../edit-job/edit-job.component';
import { EditNotificationComponent } from '../edit-notification/edit-notification.component';
import { NotificationService } from 'src/service/notification.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [JobAppliedForComponent, TabViewModule, SetNotificationComponent,
    RemoveNotificationComponent, RemoveJobAppliedForComponent, AddJobAppliedForComponent,
    ViewNotificationComponent, CommonModule, JobDetailsComponent, FormsModule,
    ConfirmDialogModule, EditJobComponent, EditNotificationComponent, RouterModule, RouterOutlet],
  providers: [MessageService, ConfirmationService, AppService, NgbModal, AppService, RouterModule, RouterOutlet,
    TabViewModule, ConfirmDialogModule, JobService, RouterModule, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  isHidden?: boolean;
  notificationsIsDisabled = true;
  lastJobID?: number = -1;
 
  public _appService!: AppService;
  public _jobService!: JobService;
  public _notificationService!: NotificationService;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public messageHeader?: string;
  public tabItem: any;
  public viewJobIsSelected: boolean = false;
  public activeIndex = 0;
  @Input('selected') selected!: boolean;
  @Output('selectedChange') selectedChange = new EventEmitter<boolean>();
  @ViewChild(JobAppliedForComponent) jobAppliedForComponent?: JobAppliedForComponent;
  @ViewChild(RemoveJobAppliedForComponent) removeJobAppliedForComponent?: RemoveJobAppliedForComponent;
  @ViewChild(ViewNotificationComponent) viewNotificationComponent?: ViewNotificationComponent;
  @ViewChild(RemoveNotificationComponent) removeNotificationComponent?: RemoveNotificationComponent;
  @ViewChild(SetNotificationComponent) setNotificationComponent?: SetNotificationComponent;
  constructor(private activatedRoute: ActivatedRoute, public appService: AppService,
    private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router,
    jobService: JobService, notificationService: NotificationService, private cd: ChangeDetectorRef) {
    this._appService = appService;
    this.isHidden = this._appService.headerIsHidden;
    this._jobService = jobService;
    this._notificationService = notificationService;
    this._confirmationService = confirmationService;
    this._messageService = messageService;

  }
  ngOnInit() {
    this.loadHeaders();
    let myval = 0;
    this._appService.activeIndex.subscribe(
      (x) => { 
       this.activeIndex = x;
     });
  }


  public hide() {
    this.hide();
  }


  public handleChange(event: TabViewChangeEvent) {
    const routingMap = [
      'app-job-applied-for',
      'app-add-job-applied-for',
      'app-remove-job-applied-for',
      'app-view-notification',
      'app-set-notification',
      'app-remove-notification',
    ];
    this.router.navigate(['./', routingMap[event.index] ], {
      relativeTo: this.activatedRoute
    });
     this.activeIndex = event.index;

  }

  public formGroup: FormGroup = new FormGroup({
    viewJobSelected: new FormControl<boolean>(true),
    addJobSelected: new FormControl<boolean>(false),
    removeJobSelected: new FormControl<boolean>(false),
    viewNotificationSelected: new FormControl<boolean>(false),
    addNotificationSelected: new FormControl<boolean>(false),
    removeNotificationSelected: new FormControl<boolean>(false)
});

  confirm(messageToShow: string) {
    this.confirmationService?.confirm({
      message: messageToShow,
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }

  onInputChange(event: any) {
    this.selected = event.target.value;
    this.selectedChange.emit(this.selected);
  }

  onSelectedChange(selected: boolean): boolean {
     return selected;
  }
  public loadHeaders() {
    this.notificationsIsDisabled = this.appService.getNotificationTabIsDisabled();
    this._jobService!.getLastJobID()?.subscribe((jobID: number) => {
      this.lastJobID = jobID;
      if (jobID != null && jobID >= 1 && jobID != undefined) {
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
        let message: string = "Error occured while trying to retrieve the last job. See developer for solution."
        console.log(error);
        this.confirm(message);
      });
  }



  public refreshTables() {
    this.jobAppliedForComponent?.refreshDataGrid(this.jobAppliedForComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
    this.removeJobAppliedForComponent?.refreshDataGrid(this.removeJobAppliedForComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
    this.viewNotificationComponent?.refreshDataGrid(this.viewNotificationComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
    this.removeNotificationComponent?.refreshDataGrid(this.removeNotificationComponent.lastTableLazyLoadEvent as TableLazyLoadEvent);
    this.setNotificationComponent?.populateJobEnumDropDown();
  }
  

public setActiveTab(index:Number) {
  switch(index) {
    case 0: this.setFirstTabAsActive();
    break;
    case 1: this.setSecondTabAsActive();
    break;
    case 2: this.setThirdTabAsActive();
    break;
    case 3: this.setFourthTabAsActive();
    break;
    case 4: this.setFifthTabAsActive();
    break;
    case 5: this.setSixthTabAsActive();
    break;
    default:
    break;
  }
}

public setFirstTabAsActive() {
    this.formGroup.controls.viewJobSelected.setValue(true);
    this.formGroup.controls.addJobSelected.setValue(false);
    this.formGroup.controls.removeJobSelected.setValue(false);
    this.formGroup.controls.viewNotificationSelected.setValue(false);
    this.formGroup.controls.addNotificationSelected.setValue(false);
    this.formGroup.controls.removeNotificationSelected.setValue(false);
  }
  
public setSecondTabAsActive() {
    this.formGroup.controls.viewJobSelected.setValue(false);
    this.formGroup.controls.addJobSelected.setValue(true);
    this.formGroup.controls.removeJobSelected.setValue(false);
    this.formGroup.controls.viewNotificationSelected.setValue(false);
    this.formGroup.controls.addNotificationSelected.setValue(false);
    this.formGroup.controls.removeNotificationSelected.setValue(false);
  }
  
public setThirdTabAsActive() {
    this.formGroup.controls.viewJobSelected.setValue(false);
    this.formGroup.controls.addJobSelected.setValue(false);
    this.formGroup.controls.removeJobSelected.setValue(true);
    this.formGroup.controls.viewNotificationSelected.setValue(false);
    this.formGroup.controls.addNotificationSelected.setValue(false);
    this.formGroup.controls.removeNotificationSelected.setValue(false);
  }
  
public setFourthTabAsActive() {
    this.formGroup.controls.viewJobSelected.setValue(false);
    this.formGroup.controls.addJobSelected.setValue(false);
    this.formGroup.controls.removeJobSelected.setValue(false);
    this.formGroup.controls.viewNotificationSelected.setValue(true);
    this.formGroup.controls.addNotificationSelected.setValue(false);
    this.formGroup.controls.removeNotificationSelected.setValue(false);
  }
  
  
public setFifthTabAsActive() {
    this.formGroup.controls.viewJobSelected.setValue(false);
    this.formGroup.controls.addJobSelected.setValue(false);
    this.formGroup.controls.removeJobSelected.setValue(false);
    this.formGroup.controls.viewNotificationSelected.setValue(false);
    this.formGroup.controls.addNotificationSelected.setValue(true);
    this.formGroup.controls.removeNotificationSelected.setValue(false);
  }
  
  
  
public setSixthTabAsActive() {
    this.formGroup.controls.viewJobSelected.setValue(false);
    this.formGroup.controls.addJobSelected.setValue(false);
    this.formGroup.controls.removeJobSelected.setValue(false);
    this.formGroup.controls.viewNotificationSelected.setValue(false);
    this.formGroup.controls.addNotificationSelected.setValue(false);
    this.formGroup.controls.removeNotificationSelected.setValue(true);
  }

}


