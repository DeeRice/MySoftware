import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../../../service/app.service';
import { AddJobTable } from '../../../model/add-job-table';
import { JTSJob } from '../../../model/job';
import { JobService } from '../../../service/job.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-remove-job-applied-for',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule],
   providers: [JobService, MessageService, ConfirmationService,ToastModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './remove-job-applied-for.component.html',
  styleUrl: './remove-job-applied-for.component.scss'
})
export class RemoveJobAppliedForComponent {
  public _jobs!: JTSJob[];
  public titles?: AddJobTable[] = [];
  public _jobService?: JobService;
  public _messageService?: MessageService;
  public _confirmationService?: ConfirmationService;
  public _appService?: AppService;
  public currentID:number = -1;
  constructor(private appService: AppService, private jobService: JobService,
    private messageService: MessageService, private confirmationService: ConfirmationService
    ) {
      this._appService = appService;
      this._jobService = jobService;
      this._messageService = messageService;
      this._confirmationService = confirmationService;
    }
  ngOnInit() {
    this.titles = this._appService?.addJobTitles;  
   this._jobService?.getAllJobs()?.subscribe((data) => {
    if(data != null && (data as JTSJob[]).length != 0 && data != undefined){
    this._jobs = JSON.parse(data.toString());
    }
    });

}

remove(id: number){
  console.log(id);
  this.currentID = id;
  this.confirm();
}

confirm() {
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
      accept: () => {

        this._jobService?.deleteJob(this.currentID)?.subscribe(
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
}
