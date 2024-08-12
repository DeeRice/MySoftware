import { Component, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../../service/app.service';
import { AddJobTable } from '../../../model/add-job-table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { JTSJob } from '../../../model/job';
import { JobService } from '../../../service/job.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import { JTSNotification } from 'src/model/notification';
import { NotificationService } from 'src/service/notification.service';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-add-job-applied-for',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule, CalendarModule],
   providers: [MessageService, ConfirmationService,  ConfirmDialogModule, CalendarModule],
  templateUrl: './add-job-applied-for.component.html',
  styleUrl: './add-job-applied-for.component.scss'
})
export class AddJobAppliedForComponent {
  public titles?: AddJobTable[] = [];
  public _appService?: AppService;
  public _jobService?: JobService;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public _notificationService?: NotificationService;
  public jobIDIsDiabled:boolean = true;
  public newJobID:number = -1;
  _notifications!: JTSNotification[];
  _notificationsToBeDisplay?: JTSNotification[];
  public messageHeader?: string;
  @ViewChild(HeaderComponent) headerComponent?: HeaderComponent;
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

 async ngOnInit() {
   this.titles = this._appService?.addJobTitles;   
    
  }
public isNotNotes(title:any): Boolean {
  this.addJob.controls["JobID"].disable();
  if(title === "Client Notes" || title === "Recruiter Notes" || title === "Job Description"
    || title === "Date Of Submission" || title === "Date Of Follow Up" || 
    title === "Date Of Interview"
  ){
    return false;
  }
  
  else{
    return true;
  }
 }

 isNotADatePicker(title: string){
  if(title === "Date Of Submission" || title === "Date Of Follow Up" || 
    title === "Date Of Interview"){
    return false;
  }
  else{
    return true;
  }
}

onDateChanged(){
  
  //this.addNotification.controls.NotificationDate.setValue();
  }
  

addJob = new FormGroup({
 RecruiterCompanyName: new FormControl(''),
  ClientCompanyName: new FormControl(''),
  ClientCompanyPhoneNumber: new FormControl(''),
  JobID: new FormControl(''),
  JobNumber: new FormControl(''),
  JobLocation: new FormControl(''),
  JobTitle: new FormControl(''),	
  JobDescription: new FormControl(''),	
  RecruiterName: new FormControl(''),
  RecruiterPhoneNumber: new FormControl(''),
  RecruiterCompanyPhoneNumber: new FormControl(''),
  RecruiterNotes: new FormControl(''),
  ClientCompanyContactName: new FormControl(''),
  ClientNotes: new FormControl(''),
  RecruiterCompanyLocation: new FormControl(''),	
  ClientCompanyLocation: new FormControl(''),
  DateOfSubmission: new FormControl(''),
  DateOfFollowUp: new FormControl(''),
  DateOfInterview: new FormControl(''),
});


save(form: FormGroup){
this.addJob = form;
let message:string = "Are you sure that you want to add this job?";
this.messageHeader = "Add Job Confirmation";
this.confirm(message);
}

clear() {
  this.addJob.reset();
}
confirm(messageToShow: string) {
  this.confirmationService.confirm({
      header: this.messageHeader, 
      message: messageToShow,
      accept: () => {
        var job = new JTSJob();
        job.JobID = 0;
        job.JobNumber = Number.parseInt(this.addJob.controls.JobNumber.value as string) || -1;
        job.JobTitle = this.addJob.controls.JobTitle.value as string;
        job.JobLocation = this.addJob.controls.JobLocation.value as string;
        job.RecruiterName = this.addJob.controls.RecruiterName.value as string;
        job.ClientCompanyContactName = this.addJob.controls.ClientCompanyContactName.value || undefined;
        job.RecruiterCompanyName = this.addJob .controls.RecruiterCompanyName.value as string;
        job.ClientCompanyName = this.addJob .controls.ClientCompanyName.value as string;
        job.RecruiterPhoneNumber = this.addJob.controls.RecruiterPhoneNumber.value || undefined;
        job.RecruiterCompanyPhoneNumber = this.addJob.controls.RecruiterCompanyPhoneNumber.value as string;
        job.ClientCompanyPhoneNumber = this.addJob.controls.ClientCompanyPhoneNumber.value || undefined;
        job.RecruiterCompanyLocation = this.addJob.controls.RecruiterCompanyLocation.value as string;
        job.ClientCompanyLocation = this.addJob.controls.ClientCompanyLocation.value as string;
        job.RecruiterNotes = this.addJob.controls.RecruiterNotes.value || undefined;
        job.ClientNotes = this.addJob.controls.ClientNotes.value || undefined;
        job.JobDescription = this.addJob.controls.JobDescription.value as string;
        job.DateOfSubmission = new Date(this.addJob.controls.DateOfSubmission.value as string) || undefined;
        job.DateOfFollowUp = new Date(this.addJob.controls.DateOfFollowUp.value as string) || undefined;
        job.DateOfInterview = new Date(this.addJob.controls.DateOfInterview.value as string) || undefined;
        this._jobService?.addJob(job)?.subscribe(
          (result) => {
            // Handle result
            console.log(result)
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have successfully added the job.'});
            this.headerComponent?.loadHeaders();
          },
          (error) => {
            this.messageService.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to add the job.'});
          },
          () => {
            // No errors, route to new page
         
           
          }
        );
      }
  });
}

async displayNotificationsForToday() {
 await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
    if((data != null) && (data != undefined) && (data.length > 0)){
      this._notifications = JSON.parse(data.toString());
    }
  },
(error) => {
  this.messageHeader = "Error!"
  let message:string = "Error occured while trying to retrieve a list of all notifications. See developer for solution."
  console.log(error);
  this.confirm(message);
}); 

  if((this._notifications != null) && (this._notifications != undefined) && (this._notifications.length > 0)) {
    this._notificationsToBeDisplay = this._notifications.
    filter(obj => `${new Date(obj.NotificationDate).getMonth()}/${new Date(obj.NotificationDate).getDay()}/${new Date(obj.NotificationDate).getFullYear()}` == `${new Date(Date.now()).getMonth()}/${new Date(Date.now()).getDay()}/${new Date(Date.now()).getFullYear()}`)
  }
   
}
}















