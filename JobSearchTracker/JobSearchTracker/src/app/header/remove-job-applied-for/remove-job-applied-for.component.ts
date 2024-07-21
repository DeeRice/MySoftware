import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { JobService } from '../../../service/job.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { JTSJob } from 'src/model/job';

@Component({
  selector: 'app-remove-job-applied-for',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule],
   providers: [JobService, MessageService, ConfirmationService,  ConfirmDialogModule, BrowserAnimationsModule],
  templateUrl: './remove-job-applied-for.component.html',
  styleUrl: './remove-job-applied-for.component.scss'
})
export class RemoveJobAppliedForComponent {
  public _jobs!: JTSJob[];
  public _jobService?: JobService;
  public _messageService: MessageService;
  public _confirmationService: ConfirmationService;
  public currentID:number = -1;
  constructor(
    private messageService: MessageService, private confirmationService: ConfirmationService,
    private jobService: JobService,
  ) {
     this._jobService = jobService;
     this._messageService = messageService;
     this._confirmationService = confirmationService;
  }
  ngOnInit() {
   this._jobService?.getAllJobs()?.subscribe((data) => {
    this._jobs = JSON.parse(data.toString());
    });

}

remove(id: number){
  console.log(id);
  this.currentID = id;
  confirm();
}

confirm() {
  this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this job?',
      accept: () => {
          //Actual logic to perform a confirmation
          this._jobService?.deleteJob(this.currentID)?.subscribe(
            data => this._messageService?.add({severity:'info', summary:'Confirmed', detail:'You have successfully removed the job.'}),
            error => this._messageService?.add({severity:'error', summary:'Rejected', detail:'A error occurred while trying to remove the job.'})
          ); 
      }
  });
}
}
