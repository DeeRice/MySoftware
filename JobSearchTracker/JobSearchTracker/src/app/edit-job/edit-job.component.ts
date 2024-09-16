import { Component, Inject, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS, DatePipe, DatePipeConfig } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../service/app.service';
import { AddJobTable } from '../../model/add-job-table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { JTSJob } from '../../model/job';
import { JobService } from '../../service/job.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { JTSNotification } from 'src/model/notification';
import { NotificationService } from 'src/service/notification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, ObservableInput } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [HeaderComponent, TableModule, CommonModule, InputTextModule, InputTextareaModule,
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule, CalendarModule],
  providers: [MessageService, ConfirmationService, ConfirmDialogModule, CalendarModule
  ],
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.scss'
})
export class EditJobComponent {
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
  public job!: JTSJob;
  public _jobs!: JTSJob[];
  jobID: number = -1;
  public _router: Router;
  public _route?: ActivatedRoute;
  constructor(private appService: AppService, private jobService: JobService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private notificationService: NotificationService, private activatedRoute: ActivatedRoute,
    private router: Router, private headerComponent: HeaderComponent) {
    this._appService = appService;
    this._jobService = jobService;
    this._messageService = messageService;
    this._confirmationService = confirmationService;
    this._notificationService = notificationService;
    this._router = router;
    this._route = activatedRoute;
  }

  async ngOnInit() {
    this._jobs = [];
    this.titles = this._appService?.editJobTitles;
    await this._route?.params.subscribe((data: Params) => {
      if ((data != null) && (data != undefined)) {
        this.jobID = parseInt(data["id"]);
      }
    },
      (error) => {
        this.messageHeader = "Error!"
        let message: string = "Error occured while trying to retrieve the params. See developer for solution."
        console.log(error);
        this.confirm(message);
      });
    if (Number.isNaN(this.jobID) == false) {
      this._jobService!.getJobByID(this.jobID)!.pipe(debounceTime(300), distinctUntilChanged(), switchMap((value: JTSJob, index: number) => this._jobService!.getJobByID(this.jobID) as unknown as ObservableInput<JTSJob>)).subscribe((data: JTSJob) => {
        if ((data != null) && (data != undefined)) {
          this.job = JSON.parse(data.toString());
          this._jobs.push(this.job);
          this.populateJob(this.job);
          this.lockFields();
        }
      },
        (error) => {
          this.messageHeader = "Error!"
          let message: string = "Error occured while trying to retrieve the last job id. See developer for solution."
          console.log(error);
          this.confirm(message);
        });
    }

  }
  goBackToJobGrid() {
    this._router.navigateByUrl("/app-header");
  }
  lockFields() {
    this.addJob.controls.JobID.disable();
    this.addJob.controls.JobTitle.disable();
    this.addJob.controls.JobNumber.disable();
    this.addJob.controls.NotificationID.disable();
  }

  public isNotNotes(title: any): Boolean {
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
    NotificationID: new FormControl(''),
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
    DateOfSubmission: new FormControl<string | null>(null),
    DateOfFollowUp: new FormControl<string | null>(null),
    DateOfInterview: new FormControl<string | null>(null),
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
        job.JobID = Number.parseInt(this.addJob.controls.JobID.value as string) || -1;
        job.JobNumber = Number.parseInt(this.addJob.controls.JobNumber.value as string) || -1;
        job.NotificationID = Number.parseInt(this.addJob.controls.NotificationID.value as string) || -1;
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
        this._jobService?.editJob(job)?.subscribe(
          (result) => {
            // Handle result
            console.log(result);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have successfully added the job.' });

          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'A error occurred while trying to add the job.' });
          },
          () => {
            // No errors, route to new page
            debugger;
            this.headerComponent?.refreshTables();
            this.headerComponent!.changeTabs(0);
            this.goBackToJobGrid();
          }
        );
      }
    });
  }
  populateJob(job: JTSJob) {
    this.addJob.controls.JobID.setValue(job.JobID.toString() || null);
    this.addJob.controls.NotificationID.setValue(job.NotificationID?.toString() || null);
    this.addJob.controls.JobNumber.setValue(job.JobNumber.toString() || null);
    this.addJob.controls.JobTitle.setValue(job.JobTitle || null);
    this.addJob.controls.JobLocation.setValue(job.JobLocation || null);
    this.addJob.controls.RecruiterName.setValue(job.RecruiterName || null);
    this.addJob.controls.ClientCompanyContactName.setValue(job.ClientCompanyContactName || null);
    this.addJob.controls.RecruiterCompanyName.setValue(job.RecruiterCompanyName || null);
    this.addJob.controls.ClientCompanyName.setValue(job.ClientCompanyName || null);
    this.addJob.controls.RecruiterPhoneNumber.setValue(job.RecruiterPhoneNumber || null);
    this.addJob.controls.RecruiterCompanyPhoneNumber.setValue(job.RecruiterCompanyPhoneNumber || null);
    this.addJob.controls.ClientCompanyPhoneNumber.setValue(job.ClientCompanyPhoneNumber || null);
    this.addJob.controls.RecruiterCompanyLocation.setValue(job.RecruiterCompanyLocation || null);
    this.addJob.controls.ClientCompanyLocation.setValue(job.ClientCompanyLocation || null);
    this.addJob.controls.RecruiterNotes.setValue(job.RecruiterNotes || null);
    this.addJob.controls.ClientNotes.setValue(job.ClientNotes || null);
    this.addJob.controls.JobDescription.setValue(job.JobDescription || null);
    this.addJob.controls.DateOfSubmission.setValue(this.formatDate(job.DateOfSubmission, "MMMM, dd, yyyy") || null);
    this.addJob.controls.DateOfFollowUp.setValue(this.formatDate(job.DateOfFollowUp as Date, "MMMM, dd, yyyy") || null);
    this.addJob.controls.DateOfInterview.setValue(this.formatDate(job.DateOfInterview as Date, "MMMM, dd, yyyy") || null);
  }

  formatDate(date: Date, pattern: string): string {

    const datePipe: DatePipe = new DatePipe("en");
    return datePipe.transform(date, pattern) as string;
  }
}
