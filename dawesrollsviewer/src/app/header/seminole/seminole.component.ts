import { Component } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Indian } from '../../../model/indian';
import { AppService } from '../../../service/app.service';
import { IndianDataService } from '../../../service/indian-data-service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-seminole',
  standalone: true,
  imports: [TableModule, InputTextModule, CommonModule, RouterModule],
  providers: [IndianDataService, MessageService, ConfirmationService, RouterModule],
  templateUrl: './seminole.component.html',
  styleUrl: './seminole.component.scss'
})
export class SeminoleComponent {
  public indian?: Indian;
  public listofIndians: Indian[] = [];
  public _appService?: AppService;
  public _indianDataService?: IndianDataService;
  public _confirmationService?: ConfirmationService;
  public messageHeader?: string;
  public _messageService?: MessageService;
  lastTableLazyLoadEvent!: TableLazyLoadEvent;
  public _router: any;
  public _routerLink: any;
  first = 0;
  rows = 10;
  constructor(    private activatedRoute: ActivatedRoute, private router: Router, private routerLink?: RouterLink, 
    appService?: AppService, indianDataService?: IndianDataService, messageService?: MessageService,
    confirmationService?: ConfirmationService,

  ){
     this._appService = appService;
     this._indianDataService = indianDataService;
     this._messageService = messageService;
     this._confirmationService = confirmationService;
     this._router = router;
  }
  
  pageChange(event: any) {
    debugger;
    this.first = event.first;
    this.rows = event.rows;
    this.refreshDataGrid(this.lastTableLazyLoadEvent);
}

  async ngOnInit() {
    await this._indianDataService?.getAllSeminoleIndians()?.subscribe((data: Indian[]) => {
      const substring = "the indian";
      if(data.toString().includes(substring)){
        this.messageHeader = "Error Occured!"
        let message: string = data.toString();
        this.confirm(message);
      }
      else {
      if (data != null && (data as Indian[]).length != 0 && data != undefined) {
        this.listofIndians = JSON.parse(data.toString());
      }
    }
    });
  }
  
  public async refreshDataGrid(event: TableLazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    await this._indianDataService?.getAllSeminoleIndians()?.subscribe((data: Indian[]) => {
      const substring = "the job";
      const substringTwo = "the notification";
      if(data.toString().includes(substring) || data.toString().includes(substringTwo)){
        this.messageHeader = "Error Occured!"
        let message: string = data.toString();
        this.confirm(message);
      }
      else {
      if ((data != null) && (data != undefined) && ((data as Indian[]).length != 0)) {
        this.listofIndians = JSON.parse(data.toString());
      }
     }
    });
  }
  
  confirm(messageToShow: string) {
    this._confirmationService?.confirm({
      header: this.messageHeader,
      message: messageToShow,
      accept: () => {
        //Actual logic to perform a confirmation
       
      }
    });
  }
  
  
  setMessageHeader(header: string) {
    switch (header) {
      case "NotSet": this.messageHeader = ""; break;
      case "FollowUpWithEmail": this.messageHeader = "Follow Up With Email Today!"; break;
      case "FollowUpWithPhoneCall": this.messageHeader = "Follow Up With Phone Call Today!"; break;
      case "InterviewIsScheduled": this.messageHeader = "You Have An Interview Today!"; break;
      default: break;
    }
  }
  
  goToEditPage(id: string) {
    this._router.navigate(['/app-edit-job/', id]);
    console.log(id);
  }

  goToDetailPage(id: string) {
    this._router.navigate(['/app-job-details/', id]);
    console.log(id);
  }
}
