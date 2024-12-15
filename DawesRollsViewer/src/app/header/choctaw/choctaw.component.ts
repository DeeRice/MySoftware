import { Component, ElementRef, ViewChild } from '@angular/core';
import { Table, TableLazyLoadEvent, TableModule, TablePageEvent } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Indian } from '../../../model/indian';
import { AppService } from '../../../service/app.service';
import { IndianDataService } from '../../../service/indian-data-service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}


@Component({
    selector: 'app-choctaw',
    imports: [TableModule, InputTextModule, CommonModule, RouterModule, PaginatorModule],
    providers: [IndianDataService, MessageService, ConfirmationService, RouterModule, PaginatorModule],
    templateUrl: './choctaw.component.html',
    styleUrl: './choctaw.component.scss'
})
export class ChoctawComponent {
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
  public textInput:string ="";
  public filterInput:string ="";
  first = 0;
  rows = 5;
  public isStricken:Boolean = true;
  @ViewChild('choctaw') choctawTable!: Table;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerLink?: RouterLink, 
    appService?: AppService, indianDataService?: IndianDataService, messageService?: MessageService,
    confirmationService?: ConfirmationService,

  ){
     this._appService = appService;
     this._indianDataService = indianDataService;
     this._messageService = messageService;
     this._confirmationService = confirmationService;
     this._router = router;
     this._appService?.choctawInputBehaviorSubject.subscribe(
      (x:Array<object>) => {
         let input = x[0] as unknown as string;
         let selector = x[1] as unknown as string;
        if(input.trim().length === 0) {
           this.choctawTable.clear();
        }
        else{
          this.choctawTable.filterGlobal(input, selector);
        }
     });
  }
  
  getRowClass(lastName: string) {
    if (lastName === 'Stricken from roll') {
      return 'redtext';
    } else {
      return '';
    }
  }


  
  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.refreshDataGrid(this.lastTableLazyLoadEvent);
}

 returnPercentage(bloodPercentage: string): string {
    if(bloodPercentage == "full"){
      return "100%";
    }
    else {
       return this.calculateBloodPercentage(bloodPercentage);
    }
 }
 
 calculateBloodPercentage(bloodPercentage: string): string {
        let numberOfCharacters = bloodPercentage.length;
        switch(numberOfCharacters){
          case 3: return this.processThreeCharacterBloodPercentage(bloodPercentage);
          case 4: return this.processFourCharacterBloodPercentage(bloodPercentage);
          default: return "";
        }
 }

 processThreeCharacterBloodPercentage(bloodPercentage: string): string {
     let bloodpercentAsCharacterArray = bloodPercentage.split('');
     let result = parseInt(bloodpercentAsCharacterArray[0]) / parseInt(bloodpercentAsCharacterArray[2]);
     result = result * 100;
     if(Number.isNaN(result)){
       return "N/A";
     }
     else {
      return `${result.toString()}%`;
     }
    
 }
 
 processFourCharacterBloodPercentage(bloodPercentage: string): string {
     let bloodpercentAsCharacterArray = bloodPercentage.split('');
     let argOne = parseInt(bloodpercentAsCharacterArray[0]); 
     let argTwo = parseInt(bloodPercentage.substring(2, 3).toString());
     let result = argOne / argTwo;
     result = result * 100;
     if(Number.isNaN(result)){
      return "N/A";
    }
    else {
     return `${result.toString()}%`;
    }
 }

  async ngOnInit() {
    await this._indianDataService?.getAllChoctawIndians()?.subscribe((data: Indian[]) => {
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
  onMyPage(event: TablePageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this._appService?.refreshHeaderTable("header");
}
  public async refreshDataGrid(event: TableLazyLoadEvent) {
    this.lastTableLazyLoadEvent = event;
    await this._indianDataService?.getAllChoctawIndians()?.subscribe((data: Indian[]) => {
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
  
  goToDetailPage(id: string, tribe:string) {
    let indians:object[] = [id as unknown as object, tribe as unknown as object];
    this._router.navigate(['/app-indian-details/',indians]);
    console.log(id);
  }

}
