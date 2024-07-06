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
@Component({
  selector: 'app-add-job-applied-for',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule],
   providers: [MessageService, ConfirmationService,  ConfirmDialogModule],
  templateUrl: './add-job-applied-for.component.html',
  styleUrl: './add-job-applied-for.component.scss'
})
export class AddJobAppliedForComponent {
  public titles?: AddJobTable[] = [];
  public _appService?: AppService;
  public _jobService?: JobService;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  constructor(private appService: AppService, private jobService: JobService,
  private messageService: MessageService, private confirmationService: ConfirmationService
  ) {
    this._appService = appService;
    this._jobService = jobService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
  }
  ngOnInit() {
   this.titles = this._appService?.addJobTitles;   
  }
public isNotes(title:any): Boolean {
  if(title === "Client Notes" || title === "Recruiter Notes")
   return false;
  else
   return true;
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
  ClientContactName: new FormControl(''),
  ClientContactPhoneNumber: new FormControl(''),
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
  this.confirmationService.confirm({
      message: 'Are you sure that you want to add this job?',
      accept: () => {
        var job = new JTSJob();
        job.ClientCompanyLocation = this.addJob.controls.ClientCompanyLocation.value || undefined;
        job.ClientCompanyName = this.addJob .controls.ClientCompanyName.value || undefined;
        job.ClientContactName = this.addJob .controls.ClientContactName.value || undefined;
        job.ClientNotes = this.addJob.controls.ClientNotes.value || undefined;
        job.ClientCompanyPhoneNumber = this.addJob.controls.ClientCompanyPhoneNumber.value || undefined;
        job.DateOfFollowUp = new Date(this.addJob.controls.DateOfFollowUp.value as string) || undefined;
        job.DateOfInterview = new Date(this.addJob.controls.DateOfInterview.value as string) || undefined;
        job.DateOfSubmission = new Date(this.addJob.controls.DateOfSubmission.value as string) || undefined;
        job.JobDescription = this.addJob.controls.JobDescription.value || undefined;
        job.JobID = Number.parseInt(this.addJob.controls.JobID.value as string) || -1;
        job.JobLocation = this.addJob.controls.JobLocation.value || undefined;
        job.JobTitle = this.addJob.controls.JobTitle.value || undefined;
        job.RecruiterCompanyLocation = this.addJob.controls.RecruiterCompanyLocation.value || undefined;
        job.RecruiterName = this.addJob.controls.RecruiterName.value || undefined;
        job.RecruiterNotes = this.addJob.controls.RecruiterNotes.value || undefined;
        job.RecruiterPhoneNumber = this.addJob.controls.RecruiterPhoneNumber.value || undefined;
        this._jobService?.addJob(job)?.subscribe(
          data => this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have successfully added the job.'}),
          error => this.messageService.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to add the job.'})
        );
      }
  });
}
}

