import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { routes } from '../app.routes';
import { RouterLinkActive, ActivatedRoute, RouterModule, Router, RoutesRecognized, Params } from '@angular/router';
import { JTSJob } from '../../model/job';
import { HeaderComponent } from '../header/header.component';
import { JobService } from '../../service/job.service';
import { debounce, debounceTime, distinctUntilChanged, interval, Observable, ObservableInput, switchMap } from 'rxjs';
import { AppService } from 'src/service/app.service';
import { AddJobTable } from 'src/model/add-job-table';
import { NotificationService } from 'src/service/notification.service';
import { JTSNotification, JTSNotificationEventType } from 'src/model/notification';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ElementRef, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNotificationTable } from '../../model/add-notification-table';
import { ToastModule } from 'primeng/toast';
import { JTSNotificationEvent, JTSNotificationPicker, NotficationEventEnum } from 'src/model/notification';
import { MultiSelect, MultiSelectChangeEvent, MultiSelectModule, MultiSelectSelectAllChangeEvent } from 'primeng/multiselect';
import { JobEnum } from 'src/model/job';
import {CalendarModule} from 'primeng/calendar';


@Component({
  selector: 'app-edit-notification',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule, MultiSelectModule,
    CalendarModule],
    providers: [MessageService,ConfirmationService,AppService, MultiSelectModule, CalendarModule, JobService],
  templateUrl: './edit-notification.component.html',
  styleUrl: './edit-notification.component.scss'
})
export class EditNotificationComponent {
  public titles?: AddNotificationTable[] = [];
  public _notificationService?: NotificationService;
  public _appService?: AppService;
  public _router: Router;
  public _route?: ActivatedRoute;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public messageHeader?: string;
  thedateEmit!: EventEmitter<Date>;
  jobs!: JTSJob[];
  job!:JTSJob;
  index:number = 0;
  eventDate!:Date;
  notification?:JTSNotification = new JTSNotification();
  notficationEventEnum?: NotficationEventEnum;
  listOfNotficationEventEnums?: NotficationEventEnum[];
  jobEnum?: JobEnum;
  listofJobEnums?: JobEnum[];
  public _jobService?: JobService;
  public currentNotificationID: number = -1;
  jobID?: number;
  pickerPopupIsVisible!: boolean; 
  @ViewChild('ms') multiselect?: MultiSelect;
  _notifications!: JTSNotification[];
  notificationID: number = -1;
  constructor(@Inject(ActivatedRoute) activatedRoute: ActivatedRoute, 
   public notificationService: NotificationService, appService: AppService,
   private messageService: MessageService, private confirmationService: ConfirmationService,
    @Inject(Router) router: Router,   public jobService: JobService) {
      this._appService = appService;
      this._messageService = messageService;
      this._confirmationService = confirmationService;
      this._notificationService = notificationService;
      this._jobService = this.jobService;
      this._router = router;
      this._route = activatedRoute;
    }


 async ngOnInit() {
  this._notifications = [];
  this.titles = this._appService?.addNotificationTitles; 
  await this._route?.params.subscribe((data: Params) => {
    if((data != null) && (data != undefined))
      this.notificationID = parseInt(data["id"]);
    },
  (error) => {
    this.messageHeader = "Error!"
    let message:string = "Error occured while trying to retrieve the params. See developer for solution."
    console.log(error);
    this.confirm(message);
  });
    if(Number.isNaN(this.notificationID) == false){
      this.notificationService.getNotificationByID(this.notificationID)!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: JTSNotification, index: number) => this.notificationService!.getNotificationByID(this.notificationID) as unknown as ObservableInput<JTSNotification>)).subscribe((data: JTSNotification) => {
        this.notification = JSON.parse(data.toString());
           this._notifications.push(this.notification!);
     },
    (error)=> {
      this.messageHeader = "Error!"
      let message:string = "Error occured while trying to retrieve the notification id. See developer for solution."
      console.log(error);
      this.confirm(message);
    });
    }
  
   this._jobService?.getAllJobs()?.subscribe((data: JTSJob[]) => {
    if((data != null) && (data != undefined) && ((data as JTSJob[]).length != 0)){
    this.jobs = JSON.parse(data.toString());
    
    this.listofJobEnums = [];
    if((this.notification != undefined) && (this.notification != null)){
      this.notification.NotificationEvent = -1;
    }
    this.jobs.forEach((value, index) => {
          let jobEnum = new JobEnum();
          jobEnum.id = value.JobID;
          jobEnum.name = value.ClientCompanyName;
          this.listofJobEnums?.push(jobEnum);
    });
  }
}, 
(error) => {
  this.messageHeader = "Error!"
  let message:string = "Error occured while trying to retrieve a list of jobs. See developer for solution."
  console.log(error);
  this.confirm(message);

}); 
 this.makeTextboxesUnEditable();

this.setEventPicker();

}
convertNumberToNotificationEnum(eventNumber: number | undefined){
  return JTSNotificationEventType[eventNumber as number];
}

 goBackToJobGrid(){
  this._router.navigateByUrl("/app-header");
 }

 addNotification = new FormGroup({
  FK_JobID_NotficationID: new FormControl<number>(-1),
  NotificationID: new FormControl<number>(-1),
  RecruiterName: new FormControl(''),
  RecruiterCompanyName: new FormControl(''),
  RecruiterCompanyLocation: new FormControl(''),
  RecruiterPhoneNumber: new FormControl(''),	
  RecruiterCompanyPhoneNumber: new FormControl(''),	
  ClientContactName: new FormControl(''),
  ClientCompanyName: new FormControl(''),
  ClientCompanyLocation: new FormControl(''),
  ClientCompanyPhoneNumber: new FormControl(''),
  NotificationMessage: new FormControl(''),
  NotificationDate: new FormControl<Date | undefined>(undefined),
  NotificationEvent: new FormControl<NotficationEventEnum | undefined>(undefined),
 });

 isNotAPicker(title: string){
  if(title === "Job To Set Notification On" || title === "Notification Event" || 
    title === "Notification Date"){
    return false;
  }
  else{
    return true;
  }
}

makeTextboxesUnEditable(){
 
  this.addNotification.controls.NotificationID.setValue(0);
  this.addNotification.controls.ClientCompanyLocation.disable();
  this.addNotification.controls.ClientCompanyName.disable();
  this.addNotification.controls.ClientCompanyPhoneNumber.disable();
  this.addNotification.controls.ClientContactName.disable();
  this.addNotification.controls.RecruiterCompanyLocation.disable();
  this.addNotification.controls.RecruiterCompanyName.disable();
  this.addNotification.controls.RecruiterCompanyPhoneNumber.disable();
  this.addNotification.controls.RecruiterName.disable();
  this.addNotification.controls.RecruiterPhoneNumber.disable();
  this.addNotification.controls.NotificationID.disable();
}

onFK_JobIDPickerChanged(event: MultiSelectChangeEvent) {
  let obj:JTSJob | null;
  if(event.value.length > 0){
  this.job = this.jobs.find(item => item.JobID === event.value[0].id) as JTSJob;
  obj = this.job;
  }
  else{
   obj = null;
  }  


  if((obj == undefined) || (obj == null)){
    this.currentNotificationID = 0;
    this.addNotification.controls.NotificationID.setValue(0);
    this.addNotification.controls.RecruiterName.setValue("")
    this.addNotification.controls.RecruiterCompanyName.setValue("")
    this.addNotification.controls.RecruiterCompanyLocation.setValue("")
    this.addNotification.controls.RecruiterPhoneNumber.setValue("")
    this.addNotification.controls.RecruiterCompanyPhoneNumber.setValue("")
    this.addNotification.controls.ClientContactName.setValue("")
    this.addNotification.controls.ClientCompanyName.setValue("")
    this.addNotification.controls.ClientCompanyLocation.setValue("")
    this.addNotification.controls.ClientCompanyPhoneNumber.setValue("")
  }
  else{
    obj = obj as JTSJob;
    debugger;
    this.currentNotificationID = obj.JobID + 1;
    obj.notificationID = this.currentNotificationID;
    this.addNotification.controls.NotificationID.setValue(obj.notificationID || null);
    this.addNotification.controls.RecruiterName.setValue(obj.RecruiterName || null);
    this.addNotification.controls.RecruiterCompanyName.setValue(obj.RecruiterCompanyName || null)
    this.addNotification.controls.RecruiterCompanyLocation.setValue(obj.RecruiterCompanyLocation || null)
    this.addNotification.controls.RecruiterPhoneNumber.setValue(obj.RecruiterPhoneNumber || null)
    this.addNotification.controls.RecruiterCompanyPhoneNumber.setValue(obj.RecruiterPhoneNumber || null)
    this.addNotification.controls.ClientContactName.setValue(obj.ClientCompanyContactName || null)
    this.addNotification.controls.ClientCompanyName.setValue(obj.ClientCompanyName || null)
    this.addNotification.controls.ClientCompanyLocation.setValue(obj.ClientCompanyLocation || null)
    this.addNotification.controls.ClientCompanyPhoneNumber.setValue(obj.ClientCompanyPhoneNumber || null)
    this.addNotification.controls.NotificationEvent.setValue(this.notficationEventEnum as NotficationEventEnum);
    if((this.notification != null) && (this.notification != undefined)){
      this.notification.NotificationEvent = event.value[0].id;
    }

  }

}

onEventPickerChanged(event: MultiSelectChangeEvent){
  if(event.value.length > 0){
     this.addNotification.controls.NotificationEvent.setValue(this.notficationEventEnum as NotficationEventEnum | null)
     if((this.notification != null) && (this.notification != undefined)){
      this.notification.NotificationEvent = event.value[0].id;
     }
  }
  this.multiselect?.hide();
}

isNotFKPicker(title: string){

 if(title === "Notification Event" || title === "Notification Date"){
  return false;
 }
 else{
  return true;
 }
}
onNotificationEventPickerChanged(event: MultiSelectChangeEvent){

  
}
isNotANotifcationMessage(title: string){
  if(title === "Notification Message"){
    return false;
   }
   else{
    return true;
   }
}
onDateChanged(){


//this.addNotification.controls.NotificationDate.setValue();
}

isNotADatePicker(title: string){
  if(title === "Notification Date"){
    return false;
   }
   else{
    return true;
   }
}

display(num: number){
  let jtsEvent = JTSNotificationEventType[num];
  return jtsEvent[num];
}

setPickerBinding(title: string): boolean {
  if(title == "NotificationEvent"){
    return this.pickerPopupIsVisible;
  }
  else {
    return false;
  }
}

async displayNotificationsForToday() {
 await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
    if((data != null) && (data != undefined) && (data.length > 0)){
      this._notifications = JSON.parse(data.toString());
    }
  },
 (error) => {
  this.messageHeader = "Error!"
  let message:string = "Error occured while trying to retrieve a list of notifications. See developer for solution."
  console.log(error);
  this.confirm(message);
 }); 
}

save(form: FormGroup){
  console.log(form);
    this.addNotification = form;
    let message:string = "Are you sure you want add this notification?";
    this.messageHeader = "Add Notification Confirmation";
    this.confirm(message);
  }
 
  setEventPicker(){
    let eventEnumZero = new NotficationEventEnum();
    eventEnumZero.id = 0;
    eventEnumZero.name = "NotSet";
    let eventEnumOne = new NotficationEventEnum();
    eventEnumOne.id = 1;
    eventEnumOne.name = "FollowUpWithEmail";
    let eventEnumTwo = new NotficationEventEnum();
    eventEnumTwo.id = 2;
    eventEnumTwo.name = "FollowUpWithPhoneCall";
    let eventEnumThree = new NotficationEventEnum();
    eventEnumThree.id = 3;
    eventEnumThree.name = "InterviewIsScheduled";
    this.listOfNotficationEventEnums = [];
    this.listOfNotficationEventEnums.push(eventEnumZero);
    this.listOfNotficationEventEnums.push(eventEnumOne);
    this.listOfNotficationEventEnums.push(eventEnumTwo);
    this.listOfNotficationEventEnums.push(eventEnumThree);
  }
  

  clear() {
    this.addNotification.reset();
  }
 
  confirm(messageToShow: string) {
   this.confirmationService.confirm({
     message: messageToShow ,
     header: this.messageHeader,
     icon: 'pi pi-info-circle',
       accept: () => {
        if(this.notification != null && this.currentNotificationID != -1) {
         this.notification.NotificationID = this.currentNotificationID as number;
         this.notification.RecruiterName = this.addNotification.controls.RecruiterName.value as string;
         this.jobID = this.addNotification.controls.FK_JobID_NotficationID.value || undefined;
         this.notification.RecruiterCompanyName = this.addNotification.controls.RecruiterCompanyName.value as string; 
         this.notification.RecruiterCompanyLocation = this.addNotification.controls.RecruiterCompanyLocation.value as string;
         this.notification.RecruiterPhoneNumber = this.addNotification.controls.RecruiterPhoneNumber.value || undefined;
         this.notification.RecruiterCompanyPhoneNumber = this.addNotification.controls.RecruiterCompanyPhoneNumber.value as string;	
         this.notification.ClientContactName = this.addNotification.controls.ClientContactName.value || undefined;
         this.notification.ClientCompanyName = this.addNotification.controls.ClientCompanyName.value as string;
         this.notification.ClientCompanyLocation = this.addNotification.controls.ClientCompanyLocation.value as string;
         this.notification.ClientCompanyPhoneNumber = this.addNotification.controls.ClientCompanyPhoneNumber.value || undefined;
         this.notification.NotificationID = this.addNotification.controls.NotificationID.value as number;
         this.notification.NotificationDate = this.addNotification.controls.NotificationDate.value as Date;
         this.notification.Message = this.addNotification.controls.NotificationMessage.value as string;
         this.job.notificationID = this.notification.NotificationID;
         this.job.notification = this.notification;
         this.notificationService?.addNotification(this.notification)?.subscribe(
           (result) => {
             // Handle result
             console.log(result)
             this.jobService?.updateJob(this.job)?.subscribe(
               (result) => {
                 // Handle result
                 console.log(result)
                 this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have successfully added the job.'});
               },
               (error) => {
                 this.messageService.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to add the job.'});
               },
               () => {
               
               });
           },
           (error) => {
             this.messageService.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to add the job.'});
           },
           () => {
             // No errors, route to new page
           }
         );
       }
     }
   });
 
 }

}
