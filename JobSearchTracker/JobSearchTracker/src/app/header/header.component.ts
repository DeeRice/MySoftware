import { Component, EventEmitter, OnInit, OnChanges, SimpleChanges, Output } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { SetNotificationComponent } from './set-notification/set-notification.component';
import { RemoveNotificationComponent } from './remove-notification/remove-notification.component';
import { RemoveJobAppliedForComponent } from './remove-job-applied-for/remove-job-applied-for.component';
import { JobAppliedForComponent } from './job-applied-for/job-applied-for.component';
import { AddJobAppliedForComponent } from './add-job-applied-for/add-job-applied-for.component';
import { ViewNotificationComponent } from './view-notification/view-notification.component';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { CommonModule } from '@angular/common';
import { JobService } from '../../service/app.service';
import {FormsModule } from '@angular/forms';
import { RouterLinkActive, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TabViewModule, JobAppliedForComponent, SetNotificationComponent,
    RemoveNotificationComponent, RemoveJobAppliedForComponent, AddJobAppliedForComponent,
    ViewNotificationComponent, JobDetailsComponent, CommonModule, JobDetailsComponent, FormsModule
  ],
  providers: [JobService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 isHidden?: boolean;
 public myJobService?: JobService;
  constructor(private route: ActivatedRoute, public jobService: JobService) {
        this.isHidden = this.jobService.ishidden;
        this.myJobService = this.jobService;
  }
  public hide(){
    this.hide();
  }
}
