using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
using JobTrackerAPI.ViewModel;
using static JobTrackerAPI.Enum.JTEnum;

namespace JobTrackerAPI.Mapping
{
    public class Mapping : IMapping
    {
        public NotificationViewModel MapEntityToViewModel(Notification notification)
        {
            NotificationViewModel notificationViewModel = new NotificationViewModel();
            notificationViewModel.NotificationID = notification.NotificationID;
            notificationViewModel.RecruiterName = notification?.RecruiterName;
            notificationViewModel.RecruiterCompanyName = notification?.RecruiterCompanyName;
            notificationViewModel.RecruiterCompanyLocation = notification?.RecruiterCompanyLocation;
            notificationViewModel.RecruiterPhoneNumber = notification?.RecruiterPhoneNumber;
            notificationViewModel.RecruiterCompanyPhoneNumber = notification?.RecruiterCompanyPhoneNumber;
            notificationViewModel.ClientContactName = notification?.ClientContactName;
            notificationViewModel.ClientCompanyName = notification?.ClientCompanyName;
            notificationViewModel.ClientCompanyLocation = notification?.ClientCompanyLocation;
            notificationViewModel.ClientCompanyPhoneNumber = notification?.ClientCompanyPhoneNumber;
            notificationViewModel.NotificationDate = notification.NotificationDate;
            notificationViewModel.NotificationEvent = (NotificationEvent)notification.NotificationEvent;
            return notificationViewModel;
        }

        public JobViewModel MapEntityToViewModel(Job job)
        {
            JobViewModel jobViewModel = new JobViewModel();
            jobViewModel.JobID = job.JobID;
            jobViewModel.JobTitle = job?.JobTitle;
            jobViewModel.JobLocation = job?.JobLocation;
            jobViewModel.RecruiterName = job?.RecruiterName;
            jobViewModel.ClientCompanyContactName = job?.ClientCompanyContactName;
            jobViewModel.RecruiterCompanyName = job?.RecruiterCompanyName;
            jobViewModel.ClientCompanyName = job?.ClientCompanyName;
            jobViewModel.RecruiterPhoneNumber = job?.RecruiterPhoneNumber;
            jobViewModel.ClientCompanyPhoneNumber = job?.ClientCompanyPhoneNumber;
            jobViewModel.RecruiterCompanyLocation = job?.RecruiterCompanyLocation;
            jobViewModel.ClientCompanyLocation = job?.ClientCompanyLocation;
            jobViewModel.RecruiterNotes = job?.RecruiterNotes;
            jobViewModel.ClientNotes = job?.ClientNotes;
            jobViewModel.JobDescription = job?.JobDescription;
            jobViewModel.DateOfSubmission = job?.DateOfSubmission;
            jobViewModel.DateOfFollowUp = job?.DateOfFollowUp;
            jobViewModel.DateOfInterview = job?.DateOfInterview;
            if (job?.Notification != null)
            {
                jobViewModel.FK_JobID_NotficationID = job?.FK_JobID_NotficationID;
                jobViewModel.Notification = this.MapEntityToViewModel(job?.Notification);
                jobViewModel.NotificationID = job?.NotificationID;
            }
            return jobViewModel;
        }

        public Notification MapViewModelToEntity(NotificationViewModel notificationViewModel)
        {
            Notification notification = new Notification();
            notification.NotificationID = notificationViewModel.NotificationID;
            notification.RecruiterName = notificationViewModel?.RecruiterName;
            notification.RecruiterCompanyName = notificationViewModel?.RecruiterCompanyName;
            notification.RecruiterCompanyLocation = notificationViewModel?.RecruiterCompanyLocation;
            notification.RecruiterPhoneNumber = notificationViewModel?.RecruiterPhoneNumber;
            notification.RecruiterCompanyPhoneNumber = notificationViewModel?.RecruiterCompanyPhoneNumber;
            notification.ClientContactName = notificationViewModel?.ClientContactName;
            notification.ClientCompanyName = notificationViewModel?.ClientCompanyName;
            notification.ClientCompanyLocation = notificationViewModel?.ClientCompanyLocation;
            notification.ClientCompanyPhoneNumber = notificationViewModel?.ClientCompanyPhoneNumber;
            notification.NotificationDate = notificationViewModel.NotificationDate;
            notification.NotificationEvent = notificationViewModel?.NotificationEvent == null ? 0 : (int)notificationViewModel?.NotificationEvent;
            notification.Message = notificationViewModel?.Message;
            return notification;

        }

        public Job MapViewModelToEntity(JobViewModel jobViewModel)
        {
            Job job = new Job();
            job.JobID = jobViewModel.JobID;
            job.JobTitle = jobViewModel?.JobTitle;
            job.JobLocation = jobViewModel?.JobLocation;
            job.RecruiterName = jobViewModel?.RecruiterName;
            job.ClientCompanyContactName = jobViewModel?.ClientCompanyContactName;
            job.RecruiterCompanyName = jobViewModel?.RecruiterCompanyName;
            job.ClientCompanyName = jobViewModel?.ClientCompanyName;
            job.RecruiterPhoneNumber = jobViewModel?.RecruiterPhoneNumber;
            job.ClientCompanyPhoneNumber = jobViewModel?.ClientCompanyPhoneNumber;
            job.RecruiterCompanyLocation = jobViewModel?.RecruiterCompanyLocation;
            job.ClientCompanyLocation = jobViewModel?.ClientCompanyLocation;
            job.RecruiterNotes = jobViewModel?.RecruiterNotes;
            job.ClientNotes = jobViewModel?.ClientNotes;
            job.JobDescription = jobViewModel?.JobDescription;
            job.DateOfSubmission = jobViewModel?.DateOfSubmission;
            job.DateOfFollowUp = jobViewModel?.DateOfFollowUp;
            job.DateOfInterview = jobViewModel?.DateOfInterview;
            if (jobViewModel?.Notification != null)
            {
                job.FK_JobID_NotficationID = jobViewModel?.FK_JobID_NotficationID;
                job.Notification = this.MapViewModelToEntity(jobViewModel?.Notification);
                job.NotificationID = jobViewModel?.NotificationID;
            }
            return job;
        }
    }
}
