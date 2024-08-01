import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../../service/app.service';
import { AddJobTable } from '../../../model/add-job-table';
import { JTSJob } from '../../../model/job';
import { JobService } from '../../../service/job.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { JTSNotification } from 'src/model/notification';
import { NotificationService } from 'src/service/notification.service';

@Component({
  selector: 'app-remove-job-applied-for',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule],
   providers: [JobService, MessageService, ConfirmationService,ToastModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './remove-job-applied-for.component.html',
  styleUrl: './remove-job-applied-for.component.scss'
})
export class RemoveJobAppliedForComponent {
  public _jobs!: JTSJob[];
  public titles?: AddJobTable[] = [];
  public _jobService?: JobService;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public _notificationService?: NotificationService;
  public _appService?: AppService;
  public currentID:number = -1;
  public lastTableLazyLoadEvent?: TableLazyLoadEvent;
  _notifications!: JTSNotification[];
  constructor(private appService: AppService, private jobService: JobService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private notificationService: NotificationService
    ) {
      this._appService = appService;
      this._jobService = jobService;
      this._messageService = messageService;
      this._confirmationService = confirmationService;
      this._notificationService = notificationService;
    }
  ngOnInit() {
    this.titles = this._appService?.addJobTitles;  
   this._jobService?.getAllJobs()?.subscribe((data) => {
    if(data != null && (data as JTSJob[]).length != 0 && data != undefined){
    this._jobs = JSON.parse(data.toString());
    }
    });

    //  this.refreshDataGrid(this.lastTableLazyLoadEvent as TableLazyLoadEvent);

}

remove(id: number){
  console.log(id);
  this.currentID = id;
  this.confirm();
}

confirm() {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this job?',
    header: 'Delete Job Confirmation',
    icon: 'pi pi-info-circle',
      accept: () => {

        this._jobService?.deleteJob(this.currentID)?.subscribe(
          (result) => {
            // Handle result
            console.log(result)
          },
          (error) => {
            this.messageService.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to add the job.'});
          },
          () => {
            // No errors, route to new page
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have successfully added the job.'});

          }
        );
      }
  });
}

public async refreshDataGrid(event: TableLazyLoadEvent) {
  this.lastTableLazyLoadEvent = event;
  this._appService!.setNotificationTabIsDisabled(true);
  await this._jobService?.getAllJobs()?.subscribe((data: JTSJob[]) => {
     if(data != null && (data as JTSJob[]).length != 0 && data != undefined){
       this._jobs = JSON.parse(data.toString());
     }
     if(this._jobs.length >= 1){
       this._appService!.setNotificationTabIsDisabled(false);
      }
      else {
       this._appService!.setNotificationTabIsDisabled(true);
      }
   }); 
}

async displayNotificationsForToday() {
 await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
    if(data.length > 0){
      this._notifications = JSON.parse(data.toString());
    }
  }); 
}
}
