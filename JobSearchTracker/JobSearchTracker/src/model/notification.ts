export class JTSNotification {
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
NotificationEvent: JTSNotificationEvent = JTSNotificationEvent.NotSet;
FK_NotficationID_JobID: number = 0;
}


export enum JTSNotificationEvent {
    NotSet = 0,
    FollowUpWithEmail = 1,
    FollowUpWithPhoneCall = 2,
    InterviewIsScheduled = 3
  }