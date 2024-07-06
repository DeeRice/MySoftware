import { Component, EventEmitter, OnChanges, SimpleChanges, Output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
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
import { AppService } from '../service/app.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SetNotificationComponent, TabViewModule,
    RemoveNotificationComponent, RemoveJobAppliedForComponent, JobAppliedForComponent, JobDetailsComponent,
    AddJobAppliedForComponent, ViewNotificationComponent, RouterModule],
  providers: [NgbModal, AppService, RouterModule, RouterOutlet, CommonModule,RouterLink, 
    RouterLinkActive, FormsModule, RouterOutlet, BrowserAnimationsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'JobSearchTracker';
  jobGridIsHidden?: boolean = false;
  @Output() isHiddensChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  public _httpClient?: HttpClient;
  constructor(private modalService: NgbModal, public appService: AppService,
  httpClient: HttpClient) {
    this.jobGridIsHidden = this.appService.ishidden;
    this._httpClient = this._httpClient;
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
  ngOnChanges(changes: SimpleChanges) {

     
}
  
}
