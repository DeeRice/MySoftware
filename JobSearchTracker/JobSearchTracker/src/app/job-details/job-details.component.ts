import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { routes } from '../app.routes';
import { RouterLinkActive, ActivatedRoute, RouterModule, Router, RoutesRecognized, Params } from '@angular/router';
import { JTSJob } from '../../model/job';
import { HeaderComponent } from '../header/header.component';
import { JobService } from '../../service/job.service';
import { debounce, debounceTime, distinctUntilChanged, interval, Observable, ObservableInput, switchMap } from 'rxjs';
import { AppService } from 'src/service/app.service';
import { AddJobTable } from 'src/model/add-job-table';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [HeaderComponent, ButtonModule, TableModule, CommonModule],
  providers: [JobService, AppService, TableModule, CommonModule, ButtonModule,RouterModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  public titles?: AddJobTable[] = [];
  public _jobService?: JobService;
  public _appService?: AppService;
  public _router: Router;
  public _route?: ActivatedRoute;
  constructor(@Inject(ActivatedRoute) activatedRoute: ActivatedRoute, 
   public jobService: JobService, appService: AppService,
    @Inject(Router) router: Router) {
     this._jobService = jobService;
     this._router = router;
     this._route = activatedRoute;
     this._appService = appService;
     this.jobDetails! = [] as JTSJob[];
    }
  public job!: JTSJob;
  public jobDetails!: JTSJob[];
  jobID: number = -1;
 async ngOnInit() {
   this.titles = this._appService?.addJobTitles;
  await this._route?.params.subscribe((data: Params) =>{
      this.jobID = parseInt(data["id"]);
    });
    if(Number.isNaN(this.jobID) == false){
      this._jobService!.getJobByID(this.jobID)!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: JTSJob, index: number) => this._jobService!.getJobByID(this.jobID) as unknown as ObservableInput<JTSJob>)).subscribe((data: JTSJob) => {
        this.job! = JSON.parse(data.toString());
           this!.jobDetails!.push(this!.job!);
     });
    }
   
 }
 goBackToJobGrid(){
  this._router.navigateByUrl("/app-header");
 }
}
