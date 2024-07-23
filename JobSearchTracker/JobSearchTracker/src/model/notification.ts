import { JTSJob } from '../model/job';

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
NotificationEvent?: number;
}

export class JTSNotificationEvent {
  id: number = 0;
  value?: JTSNotificationEventType;
}

export enum JTSNotificationEventType {
    NotSet = 0,
    FollowUpWithEmail = 1,
    FollowUpWithPhoneCall = 2,
    InterviewIsScheduled = 3
  }

  export class JTSNotificationPicker {
    EventPicked?: string;
  }