import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HeaderComponent } from '../app/header/header.component';
import { AddJobTable } from '../model/add-job-table';
import { AddNotificationTable } from '../model/add-notification-table';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  jobDetailsIsHidden?: boolean = false;
  notificationDetailsIsHidden: boolean = false;
  headerIsHidden?: boolean = false;
  notificationTabIsDisabled: boolean = true;
  private headerIsHiddenBehavior = new BehaviorSubject(false);
  getHeaderIsHidden = this.headerIsHiddenBehavior.asObservable();
  private notificationDetailsIsHiddenBehavior = new BehaviorSubject(false);
  getNotificationDetailsIsHidden = this.notificationDetailsIsHiddenBehavior.asObservable();
  private jobDetailsIsHiddenBehavior = new BehaviorSubject(false);
  getjobDetailsIsHidden = this.jobDetailsIsHiddenBehavior.asObservable();
  public activeIndex:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public addJobTitles?: AddJobTable[] = [
    { titleName: "Job ID", formName: "JobID" },
    { titleName: "Job Number", formName: "JobNumber" },
    { titleName: "Job Title", formName: "JobTitle" },
    { titleName: "Job Location", formName: "JobLocation" },
    { titleName: "Recruiter Name", formName: "RecruiterName" },
    { titleName: "Client Company Contact Name", formName: "ClientCompanyContactName" },
    { titleName: "Recruiter Company Name", formName: "RecruiterCompanyName" },
    { titleName: "Client Company Name", formName: "ClientCompanyName" },
    { titleName: "Recruiter Phone Number", formName: "RecruiterPhoneNumber" },
    { titleName: "Recruiter Company Phone Number", formName: "RecruiterCompanyPhoneNumber" },
    { titleName: "Client Company Phone Number", formName: "ClientCompanyPhoneNumber" },
    { titleName: "Recruiter Company Location", formName: "RecruiterCompanyLocation" },
    { titleName: "Client Company Location", formName: "ClientCompanyLocation" },
    { titleName: "Recruiter Notes", formName: "RecruiterNotes" },
    { titleName: "Client Notes", formName: "ClientNotes" },
    { titleName: "Job Description", formName: "JobDescription" },
    { titleName: "Date Of Submission", formName: "DateOfSubmission" },
    { titleName: "Date Of Follow Up", formName: "DateOfFollowUp" },
    { titleName: "Date Of Interview", formName: "DateOfInterview" }];

  public editJobTitles?: AddJobTable[] = [
    { titleName: "Job ID", formName: "JobID" },
    { titleName: "Notification ID", formName: "NotificationID" },
    { titleName: "Job Number", formName: "JobNumber" },
    { titleName: "Job Title", formName: "JobTitle" },
    { titleName: "Job Location", formName: "JobLocation" },
    { titleName: "Recruiter Name", formName: "RecruiterName" },
    { titleName: "Client Company Contact Name", formName: "ClientCompanyContactName" },
    { titleName: "Recruiter Company Name", formName: "RecruiterCompanyName" },
    { titleName: "Client Company Name", formName: "ClientCompanyName" },
    { titleName: "Recruiter Phone Number", formName: "RecruiterPhoneNumber" },
    { titleName: "Recruiter Company Phone Number", formName: "RecruiterCompanyPhoneNumber" },
    { titleName: "Client Company Phone Number", formName: "ClientCompanyPhoneNumber" },
    { titleName: "Recruiter Company Location", formName: "RecruiterCompanyLocation" },
    { titleName: "Client Company Location", formName: "ClientCompanyLocation" },
    { titleName: "Recruiter Notes", formName: "RecruiterNotes" },
    { titleName: "Client Notes", formName: "ClientNotes" },
    { titleName: "Job Description", formName: "JobDescription" },
    { titleName: "Date Of Submission", formName: "DateOfSubmission" },
    { titleName: "Date Of Follow Up", formName: "DateOfFollowUp" },
    { titleName: "Date Of Interview", formName: "DateOfInterview" }];

  public addNotificationTitles?: AddNotificationTable[] = [
    { titleName: "Job To Set Notification On", formName: "FKJobIDNotficationID" },
    { titleName: "Job ID", formName: "JobID" },
    { titleName: "Job Number", formName: "JobNumber" },
    { titleName: "Job Title", formName: "JobTitle" },
    { titleName: "Notification ID", formName: "NotificationID" },
    { titleName: "Notification Number", formName: "NotificationNumber" },
    { titleName: "Recruiter Name", formName: "RecruiterName" },
    { titleName: "Recruiter Company Name", formName: "RecruiterCompanyName" },
    { titleName: "Recruiter Company Location", formName: "RecruiterCompanyLocation" },
    { titleName: "Recruiter Phone Number", formName: "RecruiterPhoneNumber" },
    { titleName: "Recruiter Company Phone Number", formName: "RecruiterCompanyPhoneNumber" },
    { titleName: "Client Company Name", formName: "ClientCompanyName" },
    { titleName: "Client Company Location", formName: "ClientCompanyLocation" },
    { titleName: "Client Company Phone Number", formName: "ClientCompanyPhoneNumber" },
    { titleName: "Notification Message", formName: "NotificationMessage" },
    { titleName: "Notification Date", formName: "NotificationDate" },
    { titleName: "Notification Event", formName: "NotificationEvent" }];

  constructor() {
   
  }
  setHeaderIsHidden(isHidden: boolean) {
    this.headerIsHiddenBehavior.next(isHidden);
    this.headerIsHidden = isHidden;

  }
  setNotificationIsHidden(isHidden: boolean) {
    this.notificationDetailsIsHiddenBehavior.next(isHidden);
    this.notificationDetailsIsHidden = isHidden;
  }
  setJobDetailsIsHidden(isHidden: boolean) {
    this.jobDetailsIsHiddenBehavior.next(isHidden);
    this.jobDetailsIsHidden = isHidden;
  }

  setNotificationTabIsDisabled(isHidden: boolean) {
    this.notificationTabIsDisabled = isHidden;
  }
  getNotificationTabIsDisabled(): boolean {
    return this.notificationTabIsDisabled;
  }

  setActiveIndex(index: number){
    this.activeIndex = new BehaviorSubject<number>(index);
  }

}
