import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
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
import { NotificationService } from 'src/service/notification.service';
import { JTSNotification } from 'src/model/notification';



@Component({
  selector: 'app-view-notification',
  standalone: true,
  imports: [TableModule, InputTextModule, TagModule, 
    DropdownModule, MultiSelectModule, ProgressBarModule, ToastModule, ButtonModule, 
    SliderModule,  FormsModule,FormsModule, RouterModule, CommonModule],
  providers: [AppService, NotificationService, TableModule,CommonModule,
    RouterLinkActive,RouterLink, RouterOutlet, PrimeNGConfig],
  templateUrl: './view-notification.component.html',
  styleUrl: './view-notification.component.scss'
})

export class ViewNotificationComponent {
  _notifications!: JTSNotification[];
  _notificationService: NotificationService;
  public _appService?: AppService;  
  public _router: any;
  public _routerLink: any;
  public lastTableLazyLoadEvent?: TableLazyLoadEvent;
  constructor(@Inject(ActivatedRoute) activatedRoute: ActivatedRoute, @Inject(Router) router: Router,
  public appService: AppService, PrimeNGConfig: PrimeNGConfig,
   notificationService: NotificationService, @Inject(RouterLink) routerLink?: RouterLink) {
    this._appService = appService;
    this._notificationService = notificationService;
    this._router = router;
    this._routerLink = routerLink;
  }
  ngOnInit() {
   this._notificationService.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
    if(data.length > 0){
      this._notifications = JSON.parse(data.toString());
    }
    }); 
   
    //  this.refreshDataGrid(this.lastTableLazyLoadEvent as TableLazyLoadEvent);
    
}

goToDetailPage(id: string) {
  this._appService?.setJobDetailsIsHidden(true);
  this._appService?.setHeaderIsHidden(true);
  this._appService?.setNotificationIsHidden(false);
  this._router.navigate(['/app-notification-details/', id]);
  console.log(id);
}   

public async refreshDataGrid(event: TableLazyLoadEvent) {
  this.lastTableLazyLoadEvent = event;
  await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
     if(data != null && (data as JTSNotification[]).length != 0 && data != undefined){
       this._notifications = JSON.parse(data.toString());
     }
    
   }); 
}

}