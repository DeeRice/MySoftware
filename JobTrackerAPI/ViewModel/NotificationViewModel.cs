using JobTrackerAPI.Model;
using Microsoft.AspNetCore.Mvc;
using static JobTrackerAPI.Enum.JTEnum;

namespace JobTrackerAPI.ViewModel
{
    public class NotificationViewModel
    {
        [BindProperty(Name = "NotificationID", SupportsGet = true)]
        public int NotificationID { get; set; }
        [BindProperty(Name = "RecruiterName", SupportsGet = true)]
        public string ? RecruiterName { get; set; }
        [BindProperty(Name = "RecruiterCompanyName", SupportsGet = true)]
        public string ? RecruiterCompanyName { get; set; }
        [BindProperty(Name = "RecruiterCompanyLocation", SupportsGet = true)]
        public string ? RecruiterCompanyLocation { get; set; }
        [BindProperty(Name = "RecruiterPhoneNumber", SupportsGet = true)]
        public string ? RecruiterPhoneNumber { get; set; }
        [BindProperty(Name = "RecruiterCompanyPhoneNumber", SupportsGet = true)]
        public string ? RecruiterCompanyPhoneNumber { get; set; }
        [BindProperty(Name = "ClientContactName", SupportsGet = true)]
        public string ? ClientContactName { get; set; }
        [BindProperty(Name = "ClientCompanyName", SupportsGet = true)]
        public string ? ClientCompanyName { get; set; }
        [BindProperty(Name = "ClientCompanyLocation", SupportsGet = true)]
        public string ? ClientCompanyLocation { get; set; }
        [BindProperty(Name = "ClientCompanyPhoneNumber", SupportsGet = true)]
        public string ? ClientCompanyPhoneNumber { get; set; }
        [BindProperty(Name = "NotificationDate", SupportsGet = true)]
        public DateTime NotificationDate { get; set; }
        [BindProperty(Name = "NotificationEvent", SupportsGet = true)]
        public NotificationEvent NotificationEvent { get; set; } = NotificationEvent.NotSet;
        [BindProperty(Name = "Message", SupportsGet = true)]
        public string ? Message { get; set; }

    }
}
