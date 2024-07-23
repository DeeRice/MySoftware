using JobTrackerAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace JobTrackerAPI.ViewModel
{
    public class JobViewModel
    {
        [BindProperty(Name = "JobID", SupportsGet = true)]
        public int JobID { get; set; }
        [BindProperty(Name = "JobTitle", SupportsGet = true)]
        public string ? JobTitle { get; set; }
        [BindProperty(Name = "JobLocation", SupportsGet = true)]
        public string ? JobLocation { get; set; }
        [BindProperty(Name = "RecruiterName", SupportsGet = true)]
        public string ? RecruiterName { get; set; }
        [BindProperty(Name = "ClientCompanyContactName", SupportsGet = true)]
        public string ? ClientCompanyContactName { get; set; }
        [BindProperty(Name = "RecruiterCompanyName", SupportsGet = true)]
        public string ? RecruiterCompanyName { get; set; }
        [BindProperty(Name = "ClientCompanyName", SupportsGet = true)]
        public string ? ClientCompanyName { get; set; }
        [BindProperty(Name = "RecruiterPhoneNumber", SupportsGet = true)]
        public string ? RecruiterPhoneNumber { get; set; }
        [BindProperty(Name = "ClientCompanyPhoneNumber", SupportsGet = true)]
        public string ? ClientCompanyPhoneNumber { get; set; }
        [BindProperty(Name = "RecruiterCompanyLocation", SupportsGet = true)]
        public string ? RecruiterCompanyLocation { get; set; }
        [BindProperty(Name = "ClientCompanyLocation", SupportsGet = true)]
        public string ? ClientCompanyLocation { get; set; }
        [BindProperty(Name = "RecruiterNotes", SupportsGet = true)]
        public string ? RecruiterNotes { get; set; }
        [BindProperty(Name = "ClientNotes", SupportsGet = true)]
        public string ? ClientNotes { get; set; }
        [BindProperty(Name = "JobDescription", SupportsGet = true)]
        public string ? JobDescription { get; set; }
        [BindProperty(Name = "DateOfSubmission", SupportsGet = true)]
        public DateTime ? DateOfSubmission { get; set; }
        [BindProperty(Name = "DateOfFollowUp", SupportsGet = true)]
        public DateTime ? DateOfFollowUp { get; set; }
        [BindProperty(Name = "DateOfInterview", SupportsGet = true)]
        public DateTime ? DateOfInterview { get; set; }

        [BindProperty(Name = "FK_JobID_NotficationID", SupportsGet = true)]
        public int? FK_JobID_NotficationID { get; set; }

        [BindProperty(Name = "Notification", SupportsGet = true)]
        public virtual NotificationViewModel? Notification { get; set; }

        public int ? NotificationID { get; set; }
    }
}
