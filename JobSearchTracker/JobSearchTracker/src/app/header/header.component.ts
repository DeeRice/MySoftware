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
import { AppService } from '../../service/app.service';
import {FormsModule } from '@angular/forms';
import { RouterLinkActive, ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterOutlet, RouterModule,TabViewModule, JobAppliedForComponent, SetNotificationComponent,
    RemoveNotificationComponent, RemoveJobAppliedForComponent, AddJobAppliedForComponent,
    ViewNotificationComponent, JobDetailsComponent, CommonModule, JobDetailsComponent, FormsModule
  ],
  providers: [AppService, NgbModal, AppService, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 isHidden?: boolean;
 public _appService?: AppService;
  constructor(private route: ActivatedRoute, public appService: AppService) {
        this._appService = this.appService;
        this.isHidden = this._appService.ishidden;
  }
  public hide(){
    this.hide();
  }
}
