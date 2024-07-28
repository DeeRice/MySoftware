import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HttpClientModule, provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive, ActivatedRoute, RouterModule, RouterLink, Router, RouterOutlet } from '@angular/router';
import { AppService } from '../../../service/app.service';
import { JobService } from 'src/service/job.service';
import { JTSJob } from 'src/model/job';
import { Observable } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';
import { getJSON } from 'jquery';

@Component({
  selector: 'app-job-applied-for',
  standalone: true,
  imports: [TableModule, InputTextModule, TagModule, 
    DropdownModule, MultiSelectModule, ProgressBarModule, ToastModule, ButtonModule, 
    SliderModule,  FormsModule,FormsModule, RouterModule, CommonModule],
    providers: [AppService, JobService, TableModule,CommonModule,
      RouterLinkActive,RouterLink, RouterOutlet, PrimeNGConfig],
  templateUrl: './job-applied-for.component.html',
  styleUrl: './job-applied-for.component.scss'
})

export class JobAppliedForComponent {
    jobs!: JTSJob[];
    public _appService?: AppService; 
    public _jobService?: JobService; 
    public _router: any;
    public _routerLink: any;
    @Output() isHiddensChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor(@Inject(ActivatedRoute) activatedRoute: ActivatedRoute, @Inject(Router) router: Router,
     public appService: AppService, PrimeNGConfig: PrimeNGConfig,
      jobService?: JobService, @Inject(RouterLink) routerLink?: RouterLink) {
        this._appService = appService;
        this._jobService = jobService;
        this._router = router;
        this._routerLink = routerLink;
      }

    ngOnInit() {
        this._jobService?.getAllJobs()?.subscribe((data: JTSJob[]) => {
           this.jobs = JSON.parse(data.toString());
        }); 
  
    }

    goToDetailPage(id: string) {
      this._appService?.setJobDetailsIsHidden(false);
      this._appService?.setHeaderIsHidden(true);
      this._appService?.setNotificationIsHidden(true);
      this._router.navigate(['/app-job-details/', id]);
      console.log(id);
    }   
 
}

