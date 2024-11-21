import { ChangeDetectorRef, Component, EventEmitter, Inject, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { routes } from '../app.routes';
import { RouterLinkActive, ActivatedRoute, RouterModule, Router, RoutesRecognized, Params } from '@angular/router';
import { JTSJob } from '../../model/job';
import { HeaderComponent } from '../header/header.component';
import { JobService } from '../../service/job.service';
import { debounce, debounceTime, distinctUntilChanged, interval, Observable, ObservableInput, of, switchMap } from 'rxjs';
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
import { MultiSelect, MultiSelectChangeEvent, MultiSelectLazyLoadEvent, MultiSelectModule, MultiSelectSelectAllChangeEvent } from 'primeng/multiselect';
import { JobEnum } from 'src/model/job';
import { CalendarModule } from 'primeng/calendar';
import { TabViewChangeEvent } from 'primeng/tabview';


@Component({
    selector: 'app-edit-notification',
    imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule,
        ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule, MultiSelectModule,
        CalendarModule],
    providers: [MessageService, ConfirmationService, AppService, MultiSelectModule, CalendarModule,
        JobService],
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
  job!: JTSJob;
  index: number = 0;
  eventDate!: Date;
  notification?: JTSNotification = new JTSNotification();
  notficationEventEnum?: NotficationEventEnum;
  listOfNotficationEventEnums?: NotficationEventEnum[];
  jobEnum?: JobEnum;
  listofJobEnums?: JobEnum[];
  public _jobService?: JobService;
  public currentNotificationID: number = -1;
  jobID?: number;
  pickerPopupIsVisible!: boolean;
  @ViewChild('EventPicker') eventPickerMultiselect?: MultiSelect;
  @ViewChild('JobPicker') jobPickerMultiselect?: MultiSelect;
  _notifications!: JTSNotification[];
  notificationID: number = -1;

  constructor(private activatedRoute: ActivatedRoute,
    public notificationService: NotificationService, appService: AppService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private router: Router, public jobService: JobService
  ) {
    this._appService = appService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
    this._notificationService = notificationService;
    this._jobService = jobService;
    this._router = router;
    this._route = activatedRoute;

  }


  async ngOnInit() {
    this._notifications = [];
    this.titles = this._appService?.addNotificationTitles;
    await this._route?.params.subscribe((data: Params) => {
      if ((data != null) && (data != undefined))
        this.notificationID = parseInt(data["id"]);

    },
      (error) => {
        this.messageHeader = "Error!"
        let message: string = "Error occured while trying to retrieve the params. See developer for solution."
        this.confirm(message);
      });
    if (Number.isNaN(this.notificationID) == false) {
      this.notificationService.getNotificationByID(this.notificationID)!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: JTSNotification, index: number) => this.notificationService!.getNotificationByID(this.notificationID) as unknown as ObservableInput<JTSNotification>)).subscribe((data: JTSNotification) => {
        const substring = "the job";
        const substringTwo = "the notification";
        if(data.toString().includes(substring) || data.toString().includes(substringTwo)){
          this.messageHeader = "Error Occurred!"
          let message: string = data.toString();
          this.confirm(message);
        }
        else {
          debugger;
        this.notification = JSON.parse(data.toString());
        this.currentNotificationID = this.notificationID;
        this._notifications.push(this.notification!);
        this.populateNotification(this.notification as JTSNotification);
        }
      });
    }

    this._jobService?.getAllJobs()?.subscribe((data: JTSJob[]) => {
      if ((data != null) && (data != undefined) && ((data as JTSJob[]).length != 0)) {
        const substring = "the job";
        const substringTwo = "the notification";
         if(data.toString().includes(substring) || data.toString().includes(substringTwo)){
          let message: string = data.toString();
          this.messageHeader = "Error Occured!";
          this.confirm(message);
         }
         else {
          this.jobs = JSON.parse(data.toString());
          this.job = this.jobs.find(item => item.JobID === this.notification?.JobID) as JTSJob;
          this.listofJobEnums = [];
          if ((this.notification != undefined) && (this.notification != null)) {
            debugger;
            this.notification.NotificationEvent.valueOf();
          }
          this.jobs.forEach((Value, index) => {
            let jobEnum = new JobEnum();
            jobEnum.id = Value.JobID;
            jobEnum.name = Value.ClientCompanyName;
            this.listofJobEnums?.push(jobEnum);
            if (index == 0) {
              this.jobEnum = jobEnum;
            }
         });
         
        }

      }
    });
      
    this.makeTextboxesUnEditable();

    this.setEventPicker();

  }
  convertNumberToNotificationEnum(eventNumber: number | undefined) {
    return JTSNotificationEventType[eventNumber as number];
  }

  goBackToJobGrid() {
   this._appService!.setActiveIndex(3);
   console.log(this._appService?.activeIndex);
   this._router.navigateByUrl("/app-header/app-view-notification");
 
  
  }

  addNotification = new FormGroup({
    FKJobIDNotficationID: new FormControl<string>(""),
    JobID: new FormControl<number>(-1),
    JobNumber: new FormControl<number>(-1),
    JobTitle: new FormControl<string>(""),
    NotificationID: new FormControl<number>(-1),
    NotificationNumber: new FormControl<number>(-1),
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
    NotificationDate: new FormControl<string | undefined>(undefined),
    NotificationEvent: new FormControl<NotficationEventEnum | null>(null),
  });

  isNotAPicker(title: string) {
    if (title === "Notification Event" ||
      title === "Notification Date") {
      return false;
    }
    else {
      return true;
    }
  }

  makeTextboxesUnEditable() {

    this.addNotification.controls.NotificationID.disable();
    this.addNotification.controls.NotificationNumber.disable();
    this.addNotification.controls.FKJobIDNotficationID.disable();
    this.addNotification.controls.JobID.disable();
    this.addNotification.controls.JobNumber.disable();
    this.addNotification.controls.JobTitle.disable();
    this.addNotification.controls.RecruiterName.disable();
    this.addNotification.controls.RecruiterCompanyName.disable();
    this.addNotification.controls.RecruiterCompanyLocation.disable();
    this.addNotification.controls.RecruiterPhoneNumber.disable();
    this.addNotification.controls.RecruiterCompanyPhoneNumber.disable();
    this.addNotification.controls.ClientCompanyName.disable();
    this.addNotification.controls.ClientCompanyLocation.disable();
    this.addNotification.controls.ClientCompanyPhoneNumber.disable();
  }

  onFK_JobIDPickerChanged(event: MultiSelectChangeEvent) {
    let obj: JTSJob | null;
    if (event.itemValue != null) {
      this.job = this.jobs.find(item => item.ClientCompanyName === event.itemValue?.name) as JTSJob;
      obj = this.job;
      let jobE = new JobEnum();
      jobE.id = this.job.JobID;
      jobE.name = this.job.ClientCompanyName;
      this.jobEnum = jobE
    }
    else {
      obj = null;
    }


    if ((obj == undefined) || (obj == null)) {

      this.addNotification.controls.NotificationID.setValue(null);
      this.addNotification.controls.RecruiterName.setValue("");
      this.addNotification.controls.RecruiterCompanyName.setValue("");
      this.addNotification.controls.RecruiterCompanyLocation.setValue("");
      this.addNotification.controls.RecruiterPhoneNumber.setValue("");
      this.addNotification.controls.RecruiterCompanyPhoneNumber.setValue("");
      this.addNotification.controls.ClientContactName.setValue("");
      this.addNotification.controls.ClientCompanyName.setValue("");
      this.addNotification.controls.ClientCompanyLocation.setValue("");
      this.addNotification.controls.ClientCompanyPhoneNumber.setValue("");
      this.jobPickerMultiselect?.hide();
    }
    else {
      obj = obj as JTSJob;
      obj.NotificationID = this.currentNotificationID;
      this.addNotification.controls.NotificationID.setValue(obj.NotificationID || null);
      this.addNotification.controls.RecruiterName.setValue(obj.RecruiterName || null);
      this.addNotification.controls.RecruiterCompanyName.setValue(obj.RecruiterCompanyName || null)
      this.addNotification.controls.RecruiterCompanyLocation.setValue(obj.RecruiterCompanyLocation || null)
      this.addNotification.controls.RecruiterPhoneNumber.setValue(obj.RecruiterPhoneNumber || null)
      this.addNotification.controls.RecruiterCompanyPhoneNumber.setValue(obj.RecruiterCompanyPhoneNumber || null)
      this.addNotification.controls.ClientContactName.setValue(obj.ClientCompanyContactName || null)
      this.addNotification.controls.ClientCompanyName.setValue(obj.ClientCompanyName || null)
      this.addNotification.controls.ClientCompanyLocation.setValue(obj.ClientCompanyLocation || null)
      this.addNotification.controls.ClientCompanyPhoneNumber.setValue(obj.ClientCompanyPhoneNumber || null)
      this.addNotification.controls.NotificationEvent.setValue({id: this.notification?.NotificationEvent, name: JTSNotificationEventType[this.notification!.NotificationEvent]});

      this.jobPickerMultiselect?.hide();
    }

  }


  onEventPickerChanged(event: MultiSelectChangeEvent) {
    if (event.value.length > 0) {
      this.addNotification.controls.NotificationEvent.setValue(this.notficationEventEnum as NotficationEventEnum | null)
      if ((this.notification != null) && (this.notification != undefined)) {
        this.notification.NotificationEvent = event.value[0].id;
      }
    }
    this.eventPickerMultiselect?.hide();
  }

  isNotFKPicker(title: string) {

    if (title === "Notification Event" || title === "Notification Date") {
      return false;
    }
    else {
      return true;
    }
  }
  onNotificationEventPickerChanged(event: MultiSelectChangeEvent) {


  }
  isNotANotifcationMessage(title: string) {
    if (title === "Notification Message") {
      return false;
    }
    else {
      return true;
    }
  }
  onDateChanged() {

  }

  isNotADatePicker(title: string) {
    if (title === "Notification Date") {
      return false;
    }
    else {
      return true;
    }
  }

  display(num: number) {
    let jtsEvent = JTSNotificationEventType[num];
    return jtsEvent[num];
  }

  setPickerBinding(title: string): boolean {
    if (title == "NotificationEvent") {
      return this.pickerPopupIsVisible;
    }
    else {
      return false;
    }
  }

  async displayNotificationsForToday() {
    await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
      if ((data != null) && (data != undefined) && (data.length > 0)) {
        const substring = "the job";
        const substringTwo = "the notification";
        if(data.toString().includes(substring) || data.toString().includes(substringTwo)){
          let message: string = data.toString();
          this.messageHeader = "Error Occured!";
          this.confirm(message);
        }
        else {
          this._notifications = JSON.parse(data.toString());
        }
       
      }
    });
  }

  save(form: FormGroup) {
    this.addNotification = form;
    let message: string = "Are you sure you want add this notification?";
    this.messageHeader = "Add Notification Confirmation";
    this.confirm(message);
  }

  setEventPicker() {
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
      message: messageToShow,
      header: this.messageHeader,
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.notification != null && this.currentNotificationID != -1) {
          this.notification.NotificationID = this.addNotification.controls.NotificationID.value as number;
          this.notification.NotificationNumber = this.addNotification.controls.NotificationNumber.value as number;
          this.notification.RecruiterName = this.addNotification.controls.RecruiterName.value as string;
          this.notification.RecruiterCompanyName = this.addNotification.controls.RecruiterCompanyName.value as string;
          this.notification.RecruiterCompanyLocation = this.addNotification.controls.RecruiterCompanyLocation.value as string;
          this.notification.RecruiterPhoneNumber = this.addNotification.controls.RecruiterPhoneNumber.value || undefined;
          this.notification.RecruiterCompanyPhoneNumber = this.addNotification.controls.RecruiterCompanyPhoneNumber.value as string;
          this.notification.ClientContactName = this.addNotification.controls.ClientContactName.value || undefined;
          this.notification.ClientCompanyName = this.addNotification.controls.ClientCompanyName.value as string;
          this.notification.ClientCompanyLocation = this.addNotification.controls.ClientCompanyLocation.value as string;
          this.notification.ClientCompanyPhoneNumber = this.addNotification.controls.ClientCompanyPhoneNumber.value || undefined;
          this.notification.NotificationDate = new Date(this.addNotification.controls.NotificationDate.value as string);
          this.notification.Message = this.addNotification.controls.NotificationMessage.value as string;
          this.notification.Job = this.job;
          this.job = this.jobs.find(item => item.JobID === this.notification?.JobID) as JTSJob;
          this.job.NotificationID = this.addNotification.controls.NotificationID.value as number;
          this.notification.Job = this.job;
          this.notificationService?.editNotification(this.notification)?.subscribe(
            (result) => {
              // Handle result
              const substring = "the job";
              const substringTwo = "the notification";
              if(result.toString().includes(substring) || result.toString().includes(substringTwo)){
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: `${result}` });
                this.notificationService.ViewNotificationIsSelected = true;
              }
              else {
              this.job.NotificationID = this.notification?.NotificationID;
              this.jobService?.editJob(this.job)?.subscribe(
                (result) => {
                  // Handle result
                  if(result.toString().includes(substring) || result.toString().includes(substringTwo)){
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: `${result}` });
                    this.notificationService.ViewNotificationIsSelected = true;
                  }
                  else {
                  this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have successfully added the job.' });
                  this.notificationService.ViewNotificationIsSelected = true;
                  this.goBackToJobGrid();
                  }
                })
              }
            }
          );
        }
      }
    });

  }
  formatDate(date: Date, pattern: string): string {

    const datePipe: DatePipe = new DatePipe("en");
    return datePipe.transform(date, pattern) as string;
  }

  populateNotification(notification: JTSNotification) {
    this.addNotification.controls.NotificationID.setValue(notification.NotificationID || null);
    this.addNotification.controls.JobID.setValue(notification.JobID || null);
    this.addNotification.controls.JobTitle.setValue(notification.JobTitle || null);
    this.addNotification.controls.JobNumber.setValue(notification.JobNumber || null);
    this.addNotification.controls.FKJobIDNotficationID.setValue(notification.ClientCompanyName || null);
    this.addNotification.controls.NotificationNumber.setValue(notification.NotificationNumber || null);
    this.addNotification.controls.RecruiterName.setValue(notification.RecruiterName || null);
    this.addNotification.controls.RecruiterCompanyName.setValue(notification.RecruiterCompanyName || null);
    this.addNotification.controls.RecruiterCompanyLocation.setValue(notification.RecruiterCompanyLocation || null);
    this.addNotification.controls.RecruiterPhoneNumber.setValue(notification.RecruiterPhoneNumber || null);
    this.addNotification.controls.RecruiterCompanyPhoneNumber.setValue(notification.RecruiterPhoneNumber || null);
    this.addNotification.controls.ClientContactName.setValue(notification.ClientContactName || null);
    this.addNotification.controls.ClientCompanyName.setValue(notification.ClientCompanyName || null);
    this.addNotification.controls.ClientCompanyLocation.setValue(notification.ClientCompanyLocation || null);
    this.addNotification.controls.ClientCompanyPhoneNumber.setValue(notification.ClientCompanyPhoneNumber || null);
    this.addNotification.controls.NotificationDate.setValue(this.formatDate(notification.NotificationDate as Date, "MMMM, dd, yyyy") || null);
    this.addNotification.controls.NotificationMessage.setValue(notification.Message || null);
    this.addNotification.controls.NotificationEvent.setValue({id: notification.NotificationEvent, name: JTSNotificationEventType[notification.NotificationEvent]});
    debugger;
   
    
  }

}
