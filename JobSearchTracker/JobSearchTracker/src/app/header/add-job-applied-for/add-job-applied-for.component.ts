import { Component } from '@angular/core';
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
  public jobIDIsDiabled:boolean = true;
  public newJobID:number = -1;
  constructor(private appService: AppService, private jobService: JobService,
  private messageService: MessageService, private confirmationService: ConfirmationService
  ) {
    this._appService = appService;
    this._jobService = jobService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
  }
 async ngOnInit() {
   this.titles = this._appService?.addJobTitles;   
   await this._jobService?.getLastJobID()?.subscribe((jobid)=>{
       let returnJobID = jobid;
       if(isNaN(jobid) === true){
        jobid = 1;
        this.newJobID = jobid;
        this.addJob.controls.JobID.setValue(this.newJobID.toString());
       }
       else{
       this.newJobID = parseInt(returnJobID.toString()) + 1;
       this.addJob.controls.JobID.setValue(this.newJobID.toString());
       }
   });

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
  debugger;
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
  JobLocation: new FormControl(''),
  JobTitle: new FormControl(''),	
  JobDescription: new FormControl(''),	
  RecruiterName: new FormControl(''),
  RecruiterPhoneNumber: new FormControl(''),
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
this.confirm();
}

clear() {
  this.addJob.reset();
}
confirm() {
  debugger;
  this.confirmationService.confirm({
      message: 'Are you sure that you want to add this job?',
      accept: () => {
        var job = new JTSJob();
        job.JobID = Number.parseInt(this.addJob.controls.JobID.value as string) || -1;
        job.JobTitle = this.addJob.controls.JobTitle.value || undefined;
        job.JobLocation = this.addJob.controls.JobLocation.value || undefined;
        job.RecruiterName = this.addJob.controls.RecruiterName.value || undefined;
        job.ClientCompanyContactName = this.addJob.controls.ClientCompanyContactName.value || undefined;
        job.RecruiterCompanyName = this.addJob .controls.RecruiterCompanyName.value || undefined;
        job.ClientCompanyName = this.addJob .controls.ClientCompanyName.value || undefined;
        job.RecruiterPhoneNumber = this.addJob.controls.RecruiterPhoneNumber.value || undefined;
        job.ClientCompanyPhoneNumber = this.addJob.controls.ClientCompanyPhoneNumber.value || undefined;
        job.RecruiterCompanyLocation = this.addJob.controls.RecruiterCompanyLocation.value || undefined;
        job.ClientCompanyLocation = this.addJob.controls.ClientCompanyLocation.value || undefined;
        job.RecruiterNotes = this.addJob.controls.RecruiterNotes.value || undefined;
        job.ClientNotes = this.addJob.controls.ClientNotes.value || undefined;
        job.JobDescription = this.addJob.controls.JobDescription.value || undefined;
        job.DateOfSubmission = new Date(this.addJob.controls.DateOfSubmission.value as string) || undefined;
        job.DateOfFollowUp = new Date(this.addJob.controls.DateOfFollowUp.value as string) || undefined;
        job.DateOfInterview = new Date(this.addJob.controls.DateOfInterview.value as string) || undefined;
        this._jobService?.addJob(job)?.subscribe(
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
}















