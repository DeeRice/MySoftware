import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IndianDataService } from '../../service/indian-data-service';
import { AppService } from '../../service/app.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Indian } from '../../model/indian';
import { debounceTime, distinctUntilChanged, switchMap, ObservableInput } from 'rxjs';

@Component({
  selector: 'app-indian-details',
  standalone: true,
  imports: [TableModule, InputTextModule, CommonModule, RouterModule],
  providers: [IndianDataService, MessageService, ConfirmationService, RouterModule],
  templateUrl: './indian-details.component.html',
  styleUrl: './indian-details.component.scss'
})
export class IndianDetailsComponent {

  public _appService?: AppService;
  public _indianDataService?: IndianDataService;
  public _confirmationService?: ConfirmationService;
  public _messageService?: MessageService;
  public _router: any;
  public _routerLink: any;
  public _activatedRoute: any;
  public indian!: Indian;
  public indians!: Indian[];
  jobID: number = -1;
  public messageHeader?:string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerLink?: RouterLink, 
    appService?: AppService, indianDataService?: IndianDataService, messageService?: MessageService,
    confirmationService?: ConfirmationService,

  ){
    this._appService = appService;
    this._indianDataService = indianDataService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
    this._router = router;
    this._routerLink = routerLink;
    this._activatedRoute = activatedRoute;
    this._activatedRoute.queryParams.subscribe((params: { [x: string]: any; }) => {
      const indians = params['indians']; // Access the array
      // Use JSON.parse if the array was stringified
      if (typeof indians === 'string') {
        //const parsedArray = JSON.parse(indians);
        let id:string = indians[1];
        let tableName:string = indians[2];
        this.processDetails(id, tableName);
      }
    });
  }
  public processDetails(id:string, tableName: string) {
      switch(tableName){
        case "all": this.processall(id, tableName);
                         break;
        case "cherokee": this.processCherokee(id);
                         break;
        case "chickasaw": this.processChickasaw(id);
                         break;
        case "choctaw": this.processChoctaw(id);
                         break;
        case "creek":    this.processCreek(id);
                         break;
        case "seminole": this.processSeminole(id);
                         break;
        default: break;
      }
  }
  processall(id:string, tableName:string) {
    if (Number.isNaN(parseInt(id)) == false) {
       switch(tableName){
        case "Cherokee": this.processCherokee(id); 
                         break;
        case "Chickasaw":this.processChickasaw(id); 
                         break;
        case "Choctaw":  this.processChoctaw(id); 
                         break;
        case "Creek":    this.processCreek(id); 
                         break;
        case "Seminole": this.processSeminole(id); 
                         break;
        default: break;
       }
    }
  }

  processCherokee(id:string){
    if (Number.isNaN(parseInt(id)) == false) {
      this._indianDataService!.getCherokeeIndianByID(parseInt(id))!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: Indian, index: number) => this._indianDataService!.getCherokeeIndianByID(parseInt(id)) as unknown as ObservableInput<Indian>)).subscribe((data: Indian) => {
        const substring = "the job";
        const substringTwo = "the notification";
        if(data.toString().includes(substring) || data.toString().includes(substringTwo)) {
          this.messageHeader = "Error Occured!"
          let message: string = data.toString();
          console.log(data);
          this.confirm(message);
        }
        else {
        if ((data != null) && (data != undefined)) {
          this.indian = JSON.parse(data.toString());
          this.indians.push(this.indian);
        }
       }
      });
    }

  }

  processChickasaw(id:string){
    if (Number.isNaN(parseInt(id)) == false) {
      this._indianDataService!.getChickasawIndianByID(parseInt(id))!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: Indian, index: number) => this._indianDataService!.getChickasawIndianByID(parseInt(id)) as unknown as ObservableInput<Indian>)).subscribe((data: Indian) => {
        const substring = "the job";
        const substringTwo = "the notification";
        if(data.toString().includes(substring) || data.toString().includes(substringTwo)) {
          this.messageHeader = "Error Occured!"
          let message: string = data.toString();
          console.log(data);
          this.confirm(message);
        }
        else {
        if ((data != null) && (data != undefined)) {
          this.indian = JSON.parse(data.toString());
          this.indians.push(this.indian);
        }
       }
      });
    }

  }

  processChoctaw(id:string){
    if (Number.isNaN(parseInt(id)) == false) {
      this._indianDataService!.getChoctawIndianByID(parseInt(id))!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: Indian, index: number) => this._indianDataService!.getChoctawIndianByID(parseInt(id)) as unknown as ObservableInput<Indian>)).subscribe((data: Indian) => {
        const substring = "the job";
        const substringTwo = "the notification";
        if(data.toString().includes(substring) || data.toString().includes(substringTwo)) {
          this.messageHeader = "Error Occured!"
          let message: string = data.toString();
          console.log(data);
          this.confirm(message);
        }
        else {
        if ((data != null) && (data != undefined)) {
          this.indian = JSON.parse(data.toString());
          this.indians.push(this.indian);
        }
       }
      });
    }

  }

  processCreek(id:string){
    if (Number.isNaN(parseInt(id)) == false) {
      this._indianDataService!.getCreekIndianByID(parseInt(id))!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: Indian, index: number) => this._indianDataService!.getCreekIndianByID(parseInt(id)) as unknown as ObservableInput<Indian>)).subscribe((data: Indian) => {
        const substring = "the job";
        const substringTwo = "the notification";
        if(data.toString().includes(substring) || data.toString().includes(substringTwo)) {
          this.messageHeader = "Error Occured!"
          let message: string = data.toString();
          console.log(data);
          this.confirm(message);
        }
        else {
        if ((data != null) && (data != undefined)) {
          this.indian = JSON.parse(data.toString());
          this.indians?.push(this.indian);
        }
       }
      });
    }

  }

  processSeminole(id:string){
    if (Number.isNaN(parseInt(id)) == false) {
      this._indianDataService!.getSeminoleIndianByID(parseInt(id))!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: Indian, index: number) => this._indianDataService!.getSeminoleIndianByID(parseInt(id)) as unknown as ObservableInput<Indian>)).subscribe((data: Indian) => {
        const substring = "the job";
        const substringTwo = "the notification";
        if(data.toString().includes(substring) || data.toString().includes(substringTwo)) {
          this.messageHeader = "Error Occured!"
          let message: string = data.toString();
          console.log(data);
          this.confirm(message);
        }
        else {
        if ((data != null) && (data != undefined)) {
          this.indian = JSON.parse(data.toString());
          this.indians.push(this.indian);
        }
       }
      });
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
}
