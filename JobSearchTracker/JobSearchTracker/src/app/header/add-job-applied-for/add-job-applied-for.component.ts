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
import { Job } from '../../../model/job';
import { JobService } from '../../../service/job.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-add-job-applied-for',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule],
   providers: [MessageService, ConfirmationService],
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
console.log(form);
var job = new Job();
job.ClientCompanyLocation = form.controls.ClientCompanyLocation.value;
job.ClientCompanyName = form.controls.ClientCompanyName.value;
job.ClientContactName = form.controls.ClientContactName.value;
job.ClientNotes = form.controls.ClientNotes.value;
job.ClientPhoneNumber = form.controls.ClientPhoneNumber.value;
job.DateOfFollowUp = form.controls.DateOfFollowUp.value;
job.DateOfInterview = form.controls.DateOfInterview.value;
job.DateOfSubmission = form.controls.DateOfSubmission.value;
job.JobDescription = form.controls.JobDescription.value;
job.JobID = form.controls.JobID.value;
job.JobLocation = form.controls.JobLocation.value;
job.JobTitle = form.controls.JobTitle.value;
job.RecruiterCompanyLocation = form.controls.RecruiterCompanyLocation.value;
job.RecruiterName = form.controls.RecruiterName.value;
job.RecruiterNotes = form.controls.RecruiterNotes.value;
job.RecruiterPhoneNumber = form.controls.RecruiterPhoneNumber.value;
this._jobService?.addJob(job);
}

clear() {
  this.addJob.reset();
}

}

