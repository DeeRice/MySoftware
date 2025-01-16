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
import { ButtonModule } from 'primeng/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-indian-details',
    standalone: true,
    imports: [TableModule, InputTextModule, CommonModule, RouterModule, ButtonModule],
    providers: [IndianDataService, MessageService, ConfirmationService, RouterModule, ButtonModule],
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
  public indians: Indian[] = [];
  jobID: number = -1;
  public messageHeader?:string;
  constructor( PrimeNGConfig: PrimeNGConfig, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute, private router: Router, private routerLink?: RouterLink, 
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
    
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: object[]) => {
      if (params.length == undefined) {
        //const parsedArray = JSON.parse(indians);
        let id:string = params[0] as unknown as string;
        let tableName:string = params[1] as unknown as string;
        this.processDetails(id, tableName);
      }
    });
  }


  public processDetails(id:string, tableName: string) {
      switch(tableName){
        case "All": this.processall(id, tableName);
                         break;
        case "Cherokee": this.processCherokee(id);
                         break;
        case "Chickasaw": this.processChickasaw(id);
                         break;
        case "Choctaw": this.processChoctaw(id);
                         break;
        case "Creek":    this.processCreek(id);
                         break;
        case "Ceminole": this.processSeminole(id);
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

  goBackToIndianGrid() {
    this._appService!.setActiveIndex(0);
    this._router.navigateByUrl("/app-header/app-choctaw");
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
  
  displayUrl(url?: string): SafeResourceUrl {
    if(url!.length > 0)
     return this.sanitizer.bypassSecurityTrustResourceUrl(url as string);
    else
     return this.sanitizer.bypassSecurityTrustResourceUrl("");
  }
}
