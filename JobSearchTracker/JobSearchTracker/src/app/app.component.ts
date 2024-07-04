import { Component, EventEmitter, OnChanges, SimpleChanges, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TabViewModule } from 'primeng/tabview';
import { SetNotificationComponent } from './header/set-notification/set-notification.component';
import { RemoveNotificationComponent } from './header/remove-notification/remove-notification.component';
import { RemoveJobAppliedForComponent } from './header/remove-job-applied-for/remove-job-applied-for.component';
import { JobAppliedForComponent } from './header/job-applied-for/job-applied-for.component';
import { AddJobAppliedForComponent } from './header/add-job-applied-for/add-job-applied-for.component';
import { ViewNotificationComponent } from './header/view-notification/view-notification.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobService } from '../service/app.service';
import {FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SetNotificationComponent, TabViewModule,
    RemoveNotificationComponent, RemoveJobAppliedForComponent, JobAppliedForComponent, JobDetailsComponent,
    AddJobAppliedForComponent, ViewNotificationComponent, CommonModule, RouterLink, RouterLinkActive,
    FormsModule],
  providers: [NgbModal, JobService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'JobSearchTracker';
  jobGridIsHidden?: boolean = false;
  @Output() isHiddensChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private modalService: NgbModal, public jobService: JobService) {
    this.jobGridIsHidden = this.jobService.ishidden;
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
  ngOnChanges(changes: SimpleChanges,) {

     
}
  
}
