import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ExportCSVOptions, Table, TableLazyLoadEvent, TableModule, TablePageEvent } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Indian } from '../../../model/indian';
import { AppService } from '../../../service/app.service';
import { IndianDataService } from '../../../service/indian-data-service';
import { RouterLink,Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { ExcelDataService } from "../../../service/excel-data.service";
import { Observable, map } from 'rxjs';


@Component({
    selector: 'app-choctaw',
    standalone: true,
    imports: [TableModule, InputTextModule, CommonModule, PaginatorModule, ContextMenuModule, RouterLink,
      RouterLinkActive],
    providers: [IndianDataService, ExcelDataService, MessageService, ConfirmationService],
    templateUrl: './choctaw.component.html',
    styleUrls: ['./choctaw.component.scss']
})
export class ChoctawComponent {
  public indian?: Indian;
  public listofIndians$?: Observable<Indian[]>;
  public _appService?: AppService;
  public _indianDataService?: IndianDataService;
  public _confirmationService?: ConfirmationService;
  public _excelDataService?: ExcelDataService;
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
  contextMenuItems: MenuItem[] | undefined;
  options?: ExportCSVOptions = {
    allValues: true
  };
  @ViewChild('choctaw') choctawTable!: Table;
  constructor(private router: Router, 
    appService?: AppService, indianDataService?: IndianDataService, messageService?: MessageService,
    confirmationService?: ConfirmationService, excelDataService?: ExcelDataService
  ){
     this._appService = appService;
     this._indianDataService = indianDataService;
     this._messageService = messageService;
     this._confirmationService = confirmationService;
     this._router = router;
     this._excelDataService = excelDataService;
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

 ngOnInit(): void {
  this.contextMenuItems = [
    {
      label: 'CopyToExcel',
      icon: 'pi pi-copy',
      command: () => {
        this.choctawTable.exportCSV(this.options);
      }
    }
  ];

  this.listofIndians$ = this._indianDataService?.getAllChoctawIndians()?.pipe(
    map((data: unknown) => {
      if (Array.isArray(data)) return data as Indian[];
      if (typeof data === 'string') return JSON.parse(data) as Indian[];
      return [];
    })
  );
};


ngAfterViewInit(): void {
  this._appService?.choctawInputBehaviorSubject.subscribe((x: Array<object>) => {
    const input = x[0] as unknown as string;
    const selector = x[1] as unknown as string;

    if (!input) return;

    if (input.trim().length === 0) {
      this.choctawTable?.clear();
    } else {
      this.choctawTable?.filterGlobal(input, selector);
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
    this.listofIndians$ = this._indianDataService?.getAllChoctawIndians();
      const substring = "the job";
      const substringTwo = "the notification";
      if (this.listofIndians$ === undefined || this.listofIndians$ === null) {
        this.messageHeader = "Error Occured!";
        let message: string = "No Data";
        this.confirm(message);
      }
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
    this._router.navigate(['/app-indian-details/', indians]);
    console.log(id);
  }

}
