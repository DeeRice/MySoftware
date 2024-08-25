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
            notificationViewModel.NotificationNumber = notification.NotificationNumber;
            notificationViewModel.RecruiterName = notification?.RecruiterName;
            notificationViewModel.RecruiterCompanyName = notification?.RecruiterCompanyName;
            notificationViewModel.RecruiterCompanyLocation = notification?.RecruiterCompanyLocation;
            notificationViewModel.RecruiterPhoneNumber = notification?.RecruiterPhoneNumber;
            notificationViewModel.RecruiterCompanyPhoneNumber = notification?.RecruiterCompanyPhoneNumber;
            notificationViewModel.ClientContactName = notification?.ClientContactName;
            notificationViewModel.ClientCompanyName = notification?.ClientCompanyName;
            notificationViewModel.ClientCompanyLocation = notification?.ClientCompanyLocation;
            notificationViewModel.ClientCompanyPhoneNumber = notification?.ClientCompanyPhoneNumber;
            notificationViewModel.Message = notification?.Message;
            notificationViewModel.NotificationDate = notification.NotificationDate;
            notificationViewModel.JobID = notification.JobID;
            notificationViewModel.JobNumber = notification.JobNumber;
            notificationViewModel.JobTitle = notification.JobTitle;
            notificationViewModel.NotificationEvent = (NotificationEvent)notification.NotificationEvent;
            notificationViewModel.Job = this.MapEntityToViewModel(notification?.Job);
            return notificationViewModel;
        }

        public JobViewModel MapEntityToViewModel(Job job)
        {
            JobViewModel jobViewModel = new JobViewModel();
            jobViewModel.JobID = job.JobID;
            jobViewModel.NotificationID = job.NotificationID;
            jobViewModel.JobNumber = job.JobNumber;
            jobViewModel.JobTitle = job?.JobTitle;
            jobViewModel.JobLocation = job?.JobLocation;
            jobViewModel.RecruiterName = job?.RecruiterName;
            jobViewModel.ClientCompanyContactName = job?.ClientCompanyContactName;
            jobViewModel.RecruiterCompanyName = job?.RecruiterCompanyName;
            jobViewModel.ClientCompanyName = job?.ClientCompanyName;
            jobViewModel.RecruiterPhoneNumber = job?.RecruiterPhoneNumber;
            jobViewModel.RecruiterCompanyPhoneNumber = job?.RecruiterCompanyPhoneNumber;
            jobViewModel.ClientCompanyPhoneNumber = job?.ClientCompanyPhoneNumber;
            jobViewModel.RecruiterCompanyLocation = job?.RecruiterCompanyLocation;
            jobViewModel.ClientCompanyLocation = job?.ClientCompanyLocation;
            jobViewModel.RecruiterNotes = job?.RecruiterNotes;
            jobViewModel.ClientNotes = job?.ClientNotes;
            jobViewModel.JobDescription = job?.JobDescription;
            jobViewModel.DateOfSubmission = job.DateOfSubmission;
            jobViewModel.DateOfFollowUp = job?.DateOfFollowUp;
            jobViewModel.DateOfInterview = job?.DateOfInterview;
            return jobViewModel;
        }

        public Notification MapViewModelToEntity(NotificationViewModel notificationViewModel)
        {
            Notification notification = new Notification();
            notification.NotificationID = notificationViewModel.NotificationID;
            notification.NotificationNumber = notificationViewModel.NotificationNumber;
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
            notification.JobID = notificationViewModel.JobID;
            notification.JobNumber = notificationViewModel.JobNumber;
            notification.JobTitle = notificationViewModel.JobTitle;
            notification.NotificationEvent = notificationViewModel?.NotificationEvent == null ? 0 : (int)notificationViewModel?.NotificationEvent;
            notification.Message = notificationViewModel?.Message;
            notification.Job = this.MapViewModelToEntity(notificationViewModel?.Job);
            return notification;

        }

        public Job MapViewModelToEntity(JobViewModel jobViewModel)
        {
            Job job = new Job();
            job.JobID = jobViewModel.JobID;
            job.NotificationID = jobViewModel.NotificationID;
            job.JobNumber = jobViewModel.JobNumber;
            job.JobTitle = jobViewModel?.JobTitle;
            job.JobLocation = jobViewModel?.JobLocation;
            job.RecruiterName = jobViewModel?.RecruiterName;
            job.ClientCompanyContactName = jobViewModel?.ClientCompanyContactName;
            job.RecruiterCompanyName = jobViewModel?.RecruiterCompanyName;
            job.ClientCompanyName = jobViewModel?.ClientCompanyName;
            job.RecruiterPhoneNumber = jobViewModel?.RecruiterPhoneNumber;
            job.RecruiterCompanyPhoneNumber = jobViewModel?.RecruiterCompanyPhoneNumber;
            job.ClientCompanyPhoneNumber = jobViewModel?.ClientCompanyPhoneNumber;
            job.RecruiterCompanyLocation = jobViewModel?.RecruiterCompanyLocation;
            job.ClientCompanyLocation = jobViewModel?.ClientCompanyLocation;
            job.RecruiterNotes = jobViewModel?.RecruiterNotes;
            job.ClientNotes = jobViewModel?.ClientNotes;
            job.JobDescription = jobViewModel?.JobDescription;
            job.DateOfSubmission = jobViewModel.DateOfSubmission;
            job.DateOfFollowUp = jobViewModel?.DateOfFollowUp;
            job.DateOfInterview = jobViewModel?.DateOfInterview;
          
            return job;
        }
    }
}
