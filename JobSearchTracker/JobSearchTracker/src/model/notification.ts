export class Notification {
NotificationID: number = 0;
RecruiterName?: string;
RecruiterCompanyName?: string;
RecruiterCompanyLocation?: string;
RecruiterPhoneNumber?: string;
RecruiterCompanyPhoneNumber?: string;
ClientContactName?: string;
ClientCompanyName?: string;
ClientCompanyLocation?: string;
ClientCompanyPhoneNumber?: string;
NotificationDate?: Date;
NotificationEvent: NotificationEvent = NotificationEvent.NotSet;
}


enum NotificationEvent {
    NotSet,
    FollowUpWithEmail,
    FollowUpWithPhoneCall,
    InterviewIsScheduled
  }