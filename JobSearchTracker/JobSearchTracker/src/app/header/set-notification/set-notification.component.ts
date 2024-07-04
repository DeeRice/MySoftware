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

@Component({
  selector: 'app-set-notification',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, InputTextareaModule, 
    ButtonModule, FormsModule, ReactiveFormsModule, ConfirmDialogModule, ToastModule],
  templateUrl: './set-notification.component.html',
  styleUrl: './set-notification.component.scss'
})
export class SetNotificationComponent {
  public titles?: AddNotificationTable[] = [];
  public _appService?: AppService;
  constructor(private appService: AppService) {
    this._appService = appService;
  }
  ngOnInit() {
   this.titles = this._appService?.addNotificationTitles;   
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
