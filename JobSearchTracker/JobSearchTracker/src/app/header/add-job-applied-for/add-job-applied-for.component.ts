import { Component, Host, Inject, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../../service/app.service';
import { AddJobTable } from '../../../model/add-job-table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { JTSJob } from '../../../model/job';
import { JobService } from '../../../service/job.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { JTSNotification } from 'src/model/notification';
import { NotificationService } from 'src/service/notification.service';
import { HeaderComponent } from '../header.component';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-add-job-applied-for',
    imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule,
        ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule, CalendarModule],
    providers: [MessageService, ConfirmationService, ConfirmDialogModule, CalendarModule],
    templateUrl: './add-job-applied-for.component.html',
    styleUrl: './add-job-applied-for.component.scss'
})
export class AddJobAppliedForComponent {
  public titles?: AddJobTable[] = [];
  public _appService?: AppService;
  public _jobService?: JobService;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public _notificationService?: NotificationService;
  public jobIDIsDiabled: boolean = true;
  public newJobID: number = -1;
  _notifications!: JTSNotification[];
  _notificationsToBeDisplay?: JTSNotification[];
  public messageHeader?: string;
  //@Inject(HeaderComponent) _headerComponent?: HeaderComponent;
  public _router: any;
  public _routerLink: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private appService: AppService, private jobService: JobService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private notificationService: NotificationService, private headerComponent: HeaderComponent,
    private routerLink?: RouterLink
  ) {
    this._appService = appService;
    this._jobService = jobService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
    this._notificationService = notificationService;
   // this._headerComponent = headerComponent;
    this._router = router;
    this._routerLink = routerLink;
  }

  ngOnInit() {
    this.titles = this._appService?.addJobTitles;

  }

  ngAfterViewInit() {

  }

  public isNotNotes(title: any): Boolean {
    this.addJob.controls["JobID"].disable();
    if (title === "Client Notes" || title === "Recruiter Notes" || title === "Job Description"
      || title === "Date Of Submission" || title === "Date Of Follow Up" ||
      title === "Date Of Interview"
    ) {
      return false;
    }

    else {
      return true;
    }
  }

  isNotADatePicker(title: string) {
    if (title === "Date Of Submission" || title === "Date Of Follow Up" ||
      title === "Date Of Interview") {
      return false;
    }
    else {
      return true;
    }
  }

  onDateChanged() {

    //this.addNotification.controls.NotificationDate.setValue();
  }


  addJob = new FormGroup({
    RecruiterCompanyName: new FormControl(''),
    ClientCompanyName: new FormControl(''),
    ClientCompanyPhoneNumber: new FormControl(''),
    JobID: new FormControl(''),
    JobNumber: new FormControl(''),
    JobLocation: new FormControl(''),
    JobTitle: new FormControl(''),
    JobDescription: new FormControl(''),
    RecruiterName: new FormControl(''),
    RecruiterPhoneNumber: new FormControl(''),
    RecruiterCompanyPhoneNumber: new FormControl(''),
    RecruiterNotes: new FormControl(''),
    ClientCompanyContactName: new FormControl(''),
    ClientNotes: new FormControl(''),
    RecruiterCompanyLocation: new FormControl(''),
    ClientCompanyLocation: new FormControl(''),
    DateOfSubmission: new FormControl(''),
    DateOfFollowUp: new FormControl(''),
    DateOfInterview: new FormControl(''),
  });


  save(form: FormGroup) {
    this.addJob = form;
    let message: string = "Are you sure that you want to add this job?";
    this.messageHeader = "Add Job Confirmation";
    this.confirm(message);
  }

  clear() {
    this.addJob.reset();
  }
  confirm(messageToShow: string) {
    this.confirmationService.confirm({
      header: this.messageHeader,
      message: messageToShow,
      accept: () => {
        var job = new JTSJob();
        job.JobID = 0;
        job.JobNumber = Number.parseInt(this.addJob.controls.JobNumber.value as string) || -1;
        job.JobTitle = this.addJob.controls.JobTitle.value as string;
        job.JobLocation = this.addJob.controls.JobLocation.value as string;
        job.RecruiterName = this.addJob.controls.RecruiterName.value as string;
        job.ClientCompanyContactName = this.addJob.controls.ClientCompanyContactName.value || undefined;
        job.RecruiterCompanyName = this.addJob.controls.RecruiterCompanyName.value as string;
        job.ClientCompanyName = this.addJob.controls.ClientCompanyName.value as string;
        job.RecruiterPhoneNumber = this.addJob.controls.RecruiterPhoneNumber.value || undefined;
        job.RecruiterCompanyPhoneNumber = this.addJob.controls.RecruiterCompanyPhoneNumber.value as string;
        job.ClientCompanyPhoneNumber = this.addJob.controls.ClientCompanyPhoneNumber.value || undefined;
        job.RecruiterCompanyLocation = this.addJob.controls.RecruiterCompanyLocation.value as string;
        job.ClientCompanyLocation = this.addJob.controls.ClientCompanyLocation.value as string;
        job.RecruiterNotes = this.addJob.controls.RecruiterNotes.value || undefined;
        job.ClientNotes = this.addJob.controls.ClientNotes.value || undefined;
        job.JobDescription = this.addJob.controls.JobDescription.value as string;
        job.DateOfSubmission = new Date(this.addJob.controls.DateOfSubmission.value as string) || undefined;
        job.DateOfFollowUp = new Date(this.addJob.controls.DateOfFollowUp.value as string) || undefined;
        job.DateOfInterview = new Date(this.addJob.controls.DateOfInterview.value as string) || undefined;
        this._jobService?.addJob(job)?.subscribe(
          (result) => {
            // Handle result
            const substring = "the job";
            const substringTwo = "the notification";
            if(result.toString().includes(substring) || result.toString().includes(substringTwo)){
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: result.toString() });
            }
            else {
            console.log(result)
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have successfully added the job.' });
           // this._headerComponent?.loadHeaders();
            }
          },
          () => {
            // No errors, route to new page
            //this._headerComponent?.refreshTables();
          }
        );
      }
    });
  }

  async displayNotificationsForToday() {
    await this._notificationService?.getAllNotifications()?.subscribe((data: JTSNotification[]) => {
      if ((data != null) && (data != undefined) && (data.length > 0)) {
        const substring = "the job";
        const substringTwo = "the notification";
        if(data.toString().includes(substring) || data.toString().includes(substringTwo)){
          this.messageHeader = "Error Occured!"
          let message: string = data.toString();
          this.confirm(message);
        }
        else{
          this._notifications = JSON.parse(data.toString());
        }
      }
    });

    if ((this._notifications != null) && (this._notifications != undefined) && (this._notifications.length > 0)) {
      this._notificationsToBeDisplay = this._notifications.
        filter(obj => `${new Date(obj.NotificationDate).getMonth()}/${new Date(obj.NotificationDate).getDay()}/${new Date(obj.NotificationDate).getFullYear()}` == `${new Date(Date.now()).getMonth()}/${new Date(Date.now()).getDay()}/${new Date(Date.now()).getFullYear()}`)
    }

  }

}















