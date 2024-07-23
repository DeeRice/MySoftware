import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent } from '../app/header/header.component';
import { AddJobTable } from '../model/add-job-table';
import { AddNotificationTable } from '../model/add-notification-table';

@Injectable({
  providedIn: 'root'
})

export class AppService {
 public  ishidden?: boolean = false;
 private jobGridIsHidden = new BehaviorSubject(false);
 getjobGridIsHidden = this.jobGridIsHidden.asObservable();
 public addJobTitles?: AddJobTable[] = [
  {titleName: "Job ID", formName:"JobID"}, 
  {titleName:"Job Title", formName:"JobTitle"}, 
  {titleName:"Job Location", formName:"JobLocation"}, 
  {titleName:"Recruiter Name", formName:"RecruiterName"}, 
  {titleName: "Client Company Contact Name", formName:"ClientCompanyContactName"}, 
  {titleName: "Recruiter Company Name", formName:"RecruiterCompanyName"}, 
  {titleName:"Client Company Name", formName:"ClientCompanyName"},
  {titleName:"Recruiter Phone Number", formName:"RecruiterPhoneNumber"},
  {titleName:"Client Company Phone Number", formName:"ClientCompanyPhoneNumber"} , 
  {titleName:"Recruiter Company Location", formName:"RecruiterCompanyLocation"},
  {titleName:"Client Company Location", formName:"ClientCompanyLocation"}, 
  {titleName:"Recruiter Notes", formName:"RecruiterNotes"}, 
  {titleName:"Client Notes", formName:"ClientNotes"} , 
  {titleName:"Job Description", formName:"JobDescription"},
  {titleName:"Date Of Submission", formName:"DateOfSubmission"} , 
  {titleName:"Date Of Follow Up", formName:"DateOfFollowUp"}, 
  {titleName:"Date Of Interview", formName:"DateOfInterview"}];


  public addNotificationTitles?: AddNotificationTable[] = [
    {titleName:"Job To Set Notification On", formName:"FK_NotficationID_JobID"}, 
    {titleName:"Notification ID", formName:"NotificationID"},
    {titleName:"Recruiter Name", formName:"RecruiterName"}, 
    {titleName:"Recruiter Company Name", formName:"RecruiterCompanyName"}, 
    {titleName:"Recruiter Company Location", formName:"RecruiterCompanyLocation"}, 
    {titleName:"Recruiter Phone Number", formName:"RecruiterPhoneNumber"}, 
    {titleName:"Recruiter Company Phone Number", formName:"RecruiterCompanyPhoneNumber"},
    {titleName:"Client Company Name", formName:"ClientCompanyName"}, 
    {titleName:"Client Company Location", formName:"ClientCompanyLocation"}, 
    {titleName:"Client Company Phone Number", formName:"ClientCompanyPhoneNumber"}, 
    {titleName:"Notification Date", formName:"NotificationDate"},
    {titleName:"Notification Event", formName:"NotificationEvent"}];

 constructor() { }
 setJobGridIsHidden(isHidden: boolean){
    this.jobGridIsHidden.next(isHidden);
    this.ishidden = isHidden;
 }

}
