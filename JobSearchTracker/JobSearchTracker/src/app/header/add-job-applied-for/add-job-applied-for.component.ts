import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../../../service/job.service';
import { AddJobTable } from '../../../model/add-job-table';


@Component({
  selector: 'app-add-job-applied-for',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-job-applied-for.component.html',
  styleUrl: './add-job-applied-for.component.scss'
})
export class AddJobAppliedForComponent {
  public titles?: AddJobTable[] = [];
  _jobService?: JobService;
  constructor(private jobService: JobService) {
    this._jobService = jobService;
  }
  ngOnInit() {
   this.titles = this._jobService?.addJobTitles;   
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
}

clear() {
  this.addJob.reset();
}

}

