import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { routes } from '../app.routes';
import { RouterLinkActive, ActivatedRoute, RouterModule, Router } from '@angular/router';
import { JTSJob } from '../../model/job';
import { HeaderComponent } from '../header/header.component';
import { JobService } from '../../service/job.service';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [HeaderComponent, ButtonModule],
  providers: [JobService, TableModule, CommonModule, ButtonModule,RouterModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  public titles!: string[];
  public job?: JTSJob;
  public _jobService?: JobService;
  public _router: any;
  constructor(@Inject(ActivatedRoute) activatedRoute: ActivatedRoute, 
   public jobService: JobService,
    @Inject(Router) router: Router) {
     this._jobService = jobService;
     this._router = router;
     console.log();
    }
  jobs!:  JTSJob[];
  ngOnInit() {
   this.titles = ["Recruiter Company Name", "Client Company Name" , 
   "Job Location", "Job Title", "Job Description", "Recruiter Phone Number", 
   "Recruiter Name", "Recruiter Phone Number", "Recruiter Notes",
    "Client Phone Number" , "Client Notes" , "Date Of Submission" , 
    "Date of Follow Up", "Date of Interview"];
   /*
   var id:number =this._jobService?._currentJobID as number;
 /*  this._jobService?.getJobByID(id)?.subscribe((data) => {
       this.job = data;
    }); */
    this.job = new JTSJob();
 }
 goBackToJobGrid(){
  this._router.navigateByUrl("/app-header");
 }
}
