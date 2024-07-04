import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, FormControlName, NgModel, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../../../service/job.service';
import { AddNotificationTable } from '../../../model/add-notification-table';

@Component({
  selector: 'app-set-notification',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './set-notification.component.html',
  styleUrl: './set-notification.component.scss'
})
export class SetNotificationComponent {
  public titles?: AddNotificationTable[] = [];
  _jobService?: JobService;
  constructor(private jobService: JobService) {
    this._jobService = jobService;
  }
  ngOnInit() {
   this.titles = this._jobService?.addNotificationTitles;   
  }


 addNotification = new FormGroup({
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
 }

 clear() {
   this.addNotification.reset();
 }
}
