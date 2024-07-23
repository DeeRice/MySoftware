import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../../service/app.service';
import { AddNotificationTable } from '../../../model/add-notification-table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { JTSNotification, JTSNotificationEvent, JTSNotificationEventType, JTSNotificationPicker } from 'src/model/notification';
import { NotificationService } from 'src/service/notification.service';
import { MultiSelectChangeEvent, MultiSelectModule, MultiSelectSelectAllChangeEvent } from 'primeng/multiselect';
import { JTSJob } from 'src/model/job';
import { JobService } from 'src/service/job.service';
@Component({
  selector: 'app-set-notification',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule, MultiSelectModule],
    providers: [MessageService,ConfirmationService,AppService, MultiSelectModule],
  templateUrl: './set-notification.component.html',
  styleUrl: './set-notification.component.scss'
})
export class SetNotificationComponent {
  public titles?: AddNotificationTable[] = [];
  public _appService?: AppService;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public _notificationService?: NotificationService;
  jobs!: JTSJob[];
  job!:JTSJob;
  index:number = 0;
  notificationEventTypes!: JTSNotificationEvent [];
  notificationEventType!: JTSNotificationEvent;
  eventPicker!: JTSNotificationPicker;
  eventPickerList!: JTSNotificationPicker[];
  eventPicked?: string;
  public _jobService?: JobService;
  public currentNotificationID: number = -1;
  constructor(private appService: AppService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private notificationService: NotificationService, private jobService: JobService
  ) {
    this._appService = appService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
    this._notificationService = notificationService;
    this._jobService = this.jobService;
  }
  ngOnInit() {
   this.titles = this._appService?.addNotificationTitles;   
   this._jobService?.getAllJobs()?.subscribe((data: JTSJob[]) => {
    this.jobs = JSON.parse(data.toString());
    }); 
 this.makeTextboxesUnEditable();
 this.eventPickerList = [];
 let eventpone = new JTSNotificationPicker();
 eventpone.EventPicked = JTSNotificationEventType[0].toString();
 let eventtwo = new JTSNotificationPicker();
 eventtwo.EventPicked = JTSNotificationEventType[1].toString();
 let eventpthree = new JTSNotificationPicker();
 eventpthree.EventPicked = JTSNotificationEventType[2].toString();
 let eventpfour = new JTSNotificationPicker();
 eventpfour.EventPicked = JTSNotificationEventType[3].toString();
 this.eventPickerList.push(eventpone);
 this.eventPickerList.push(eventtwo);
 this.eventPickerList.push(eventpthree);
 this.eventPickerList.push(eventpfour);
 this._jobService?.getLastJobID()?.subscribe((jobID)=>{
   this.currentNotificationID = parseInt(jobID.toString());
   this.addNotification.controls.NotificationID.setValue(this.currentNotificationID.toString());
   
  });


}


 addNotification = new FormGroup({
  FK_NotficationID_JobID: new FormControl(''),
  NotificationID: new FormControl(''),
  RecruiterName: new FormControl(''),
  RecruiterCompanyName: new FormControl(''),
  RecruiterCompanyLocation: new FormControl(''),
  RecruiterPhoneNumber: new FormControl(''),	
  RecruiterCompanyPhoneNumber: new FormControl(''),	
  ClientContactName: new FormControl(''),
  ClientCompanyName: new FormControl(''),
  ClientCompanyLocation: new FormControl(''),
  ClientCompanyPhoneNumber: new FormControl(''),
  NotificationDate: new FormControl(''),
  NotificationEvent: new FormControl(''),
 });
 
 save(form: FormGroup){
 console.log(form);
   this.addNotification = form;
   this.confirm();
 }

 clear() {
   this.addNotification.reset();
 }

 confirm() {
  this.confirmationService.confirm({
    message: 'Do you want add this notification?',
    header: 'Add Notification Confirmation',
    icon: 'pi pi-info-circle',
      accept: () => {
        var notification = new JTSNotification();
        notification.NotificationID = this.currentNotificationID;
        notification.RecruiterName = this.addNotification.controls.RecruiterName.value || undefined;
       // notification.FK_NotficationID_JobID = parseInt(this.addNotification.controls.FK_NotficationID_JobID.value?.toString() as string) as number || -1;
        notification.RecruiterCompanyName = this.addNotification.controls.RecruiterCompanyName.value || undefined; 
        notification.RecruiterCompanyLocation = this.addNotification.controls.RecruiterCompanyLocation.value || undefined;
        notification.RecruiterPhoneNumber = this.addNotification.controls.RecruiterPhoneNumber.value || undefined;
        notification.RecruiterCompanyPhoneNumber = this.addNotification.controls.RecruiterCompanyPhoneNumber.value || undefined;	
        notification.ClientContactName = this.addNotification.controls.ClientContactName.value || undefined;
        notification.ClientCompanyName = this.addNotification.controls.ClientCompanyName.value || undefined;
        notification.ClientCompanyLocation = this.addNotification.controls.ClientCompanyLocation.value || undefined;
        notification.ClientCompanyPhoneNumber = this.addNotification.controls.ClientCompanyPhoneNumber.value || undefined;
        notification.NotificationDate = new Date(this.addNotification.controls.NotificationDate.value as string) || undefined;
        notification.NotificationEvent = parseInt(this.addNotification.controls.NotificationEvent.value as string);
        debugger;
        this.notificationService?.addNotification(notification)?.subscribe(
          (result) => {
            // Handle result
            console.log(result)
          },
          (error) => {
            this.messageService.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to add the job.'});
          },
          () => {
            // No errors, route to new page
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have successfully added the job.'})
          }
        );
      }
  });
}

isNotAPicker(title: string){
  if(title === "Job To Set Notification On"){
    return false;
  }
  else{
    return true;
  }
}

makeTextboxesUnEditable(){
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

onFKPickerChanged(event: MultiSelectChangeEvent) {
  let obj: any = this.job;
  if(obj.length < 1 || obj == undefined){
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
    this.addNotification.controls.RecruiterName.setValue(obj["0"].RecruiterName?.toString() as string)
    this.addNotification.controls.RecruiterCompanyName.setValue(obj["0"].RecruiterCompanyName?.toString() as string)
    this.addNotification.controls.RecruiterCompanyLocation.setValue(obj["0"].RecruiterCompanyLocation?.toString() as string)
    this.addNotification.controls.RecruiterPhoneNumber.setValue(obj["0"].RecruiterPhoneNumber?.toString() as string)
    this.addNotification.controls.RecruiterCompanyPhoneNumber.setValue(obj["0"].RecruiterPhoneNumber?.toString() as string)
    this.addNotification.controls.ClientContactName.setValue(obj["0"].ClientCompanyContactName?.toString() as string)
    this.addNotification.controls.ClientCompanyName.setValue(obj["0"].ClientCompanyName?.toString() as string)
    this.addNotification.controls.ClientCompanyLocation.setValue(obj["0"].ClientCompanyLocation?.toString() as string)
    this.addNotification.controls.ClientCompanyPhoneNumber.setValue(obj["0"].ClientCompanyPhoneNumber?.toString() as string)
  }

}

isNotFKPicker(title: string){
 if(title === "Notification Event"){
  return false;
 }
 else{
  return true;
 }
}
onNotificationEventPickerChanged(event: MultiSelectChangeEvent){
  if(event.value.length < 1 || event.value == undefined){
    this.addNotification.controls.NotificationEvent.setValue(JTSNotificationEventType.NotSet.toString() as string);
  }
  else{
   switch(event.value["0"].EventPicked){
     case "NotSet":  this.addNotification.controls.NotificationEvent.setValue(JTSNotificationEventType.NotSet.toString() as string); break;
     case "FollowUpWithEmail":  this.addNotification.controls.NotificationEvent.setValue(JTSNotificationEventType.FollowUpWithEmail.toString() as string); break;
     case "FollowUpWithPhoneCall":  this.addNotification.controls.NotificationEvent.setValue(JTSNotificationEventType.FollowUpWithPhoneCall.toString() as string); break;
     case "InterviewIsScheduled":  this.addNotification.controls.NotificationEvent.setValue(JTSNotificationEventType.InterviewIsScheduled.toString() as string); break;
     default:break;
   }
   
  }
}
display(num: number){
  let jtsEvent = JTSNotificationEventType[num];
  return jtsEvent[num];
}
}

