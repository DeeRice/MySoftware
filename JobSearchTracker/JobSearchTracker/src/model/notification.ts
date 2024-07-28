import { JTSJob } from '../model/job';

export class JTSNotification {
public NotificationID: number = 0;
public RecruiterName?: string;
public RecruiterCompanyName?: string;
public RecruiterCompanyLocation?: string;
public RecruiterPhoneNumber?: string;
public RecruiterCompanyPhoneNumber?: string;
public ClientContactName?: string;
public ClientCompanyName?: string;
public ClientCompanyLocation?: string;
public ClientCompanyPhoneNumber?: string;
public NotificationDate!: Date;
public NotificationEvent!: number;
public Message?: string;
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

  export class NotficationEventEnum {
    id?:number;
    name?: string;
  }