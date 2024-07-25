import { JTSNotification } from "./notification";

export class JTSJob {
    JobID! :number;
    JobTitle?:string;
    JobLocation?:string;
    RecruiterName?:string;
    ClientCompanyContactName?:string;
    RecruiterCompanyName?:string;
    ClientCompanyName?:string;
    RecruiterPhoneNumber?:string;
    ClientCompanyPhoneNumber?:string;
    RecruiterCompanyLocation?:string;
    ClientCompanyLocation?:string;
    RecruiterNotes?:string;
    ClientNotes?:string;
    JobDescription?:string;
    DateOfSubmission?: Date;
    DateOfFollowUp?: Date;
    DateOfInterview?: Date;
    FK_JobID_NotficationID?: number = 0;
    notification?:JTSNotification;
    notificationID?:number = 0;
}



export class JobEnum {
    id?: number;
    name?: string;
}