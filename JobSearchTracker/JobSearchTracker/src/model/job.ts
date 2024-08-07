import { JTSNotification } from "./notification";

export class JTSJob {
    JobID! :number;
    JobNumber!: number;
    JobTitle!:string;
    JobLocation!:string;
    RecruiterName!:string;
    ClientCompanyContactName?:string;
    RecruiterCompanyName!:string;
    ClientCompanyName!:string;
    RecruiterPhoneNumber?:string;
    RecruiterCompanyPhoneNumber!: string;
    ClientCompanyPhoneNumber?:string;
    RecruiterCompanyLocation!:string;
    ClientCompanyLocation!:string;
    RecruiterNotes?:string;
    ClientNotes?:string;
    JobDescription!:string;
    DateOfSubmission!: Date;
    DateOfFollowUp?: Date;
    DateOfInterview?: Date;
    notification?:JTSNotification;
    notificationID?:number = 0;
}



export class JobEnum {
    id?: number;
    name?: string;
}