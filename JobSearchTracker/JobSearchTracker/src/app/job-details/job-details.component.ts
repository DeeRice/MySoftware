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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [HeaderComponent, ButtonModule, TableModule, CommonModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService, JobService, AppService, TableModule, CommonModule,
    ButtonModule, RouterModule, ConfirmDialogModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  public titles?: AddJobTable[] = [];
  public _jobService?: JobService;
  public _appService?: AppService;
  public _router: Router;
  public _route?: ActivatedRoute;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public messageHeader?: string;
  constructor(private activatedRoute: ActivatedRoute,
    public jobService: JobService, appService: AppService,
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private router: Router) {
    this._jobService = jobService;
    this._router = router;
    this._route = activatedRoute;
    this._appService = appService;
    this._confirmationService = this.confirmationService;
    this._messageService = this.messageService;
  }
  public job!: JTSJob;
  public jobDetails!: JTSJob[];
  jobID: number = -1;

  async ngOnInit() {
    this.jobDetails = [];
    this.titles = this._appService?.addJobTitles;
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
          this.jobDetails.push(this.job);
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

  confirm(messageToShow: string) {
    this.confirmationService?.confirm({
      message: messageToShow,
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }
}
