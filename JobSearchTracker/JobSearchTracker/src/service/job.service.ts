import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HeaderComponent } from '../app/header/header.component';
import { AddJobTable } from '../model/add-job-table';
import { AddNotificationTable } from '../model/add-notification-table';

@Injectable({
  providedIn: 'root'
})

export class JobService {
 public  ishidden?: boolean = false;
 private jobGridIsHidden = new BehaviorSubject(false);
 getjobGridIsHidden = this.jobGridIsHidden.asObservable();
 public addJobTitles?: AddJobTable[] = [
  {titleName: "Recruiter Company Name", formName:"RecruiterCompanyName"}, 
  {titleName: "Client Company Name", formName:"ClientCompanyName"}, 
  {titleName:"Job Location", formName:"JobLocation"}, 
  {titleName:"Job Title", formName:"JobTitle"}, 
  {titleName:"Job Description", formName:"JobDescription"},
  {titleName:"Recruiter Name", formName:"RecruiterName"}, 
  {titleName:"Recruiter Phone Number", formName:"RecruiterPhoneNumber"}, 
  {titleName:"Recruiter Notes", formName:"RecruiterNotes"}, 
  {titleName:"Client Contact Name", formName:"ClientContactName"},
  {titleName:"Client Contact Phone Number", formName:"ClientContactPhoneNumber"} , 
  {titleName:"Client Notes", formName:"ClientNotes"} , 
  {titleName:"Recruiter Company Location", formName:"RecruiterCompanyLocation"},
  {titleName:"Client Company Location", formName:"ClientCompanyLocation"}, 
  {titleName:"Date Of Submission", formName:"DateOfSubmission"} , 
  {titleName:"Date Of Follow Up", formName:"DateOfFollowUp"}, 
  {titleName:"Date Of Interview", formName:"DateOfInterview"}];


  public addNotificationTitles?: AddNotificationTable[] = [
    {titleName: "Recruiter Name", formName:"RecruiterName"}, 
    {titleName: "Recruiter Company Name", formName:"RecruiterCompanyName"}, 
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
