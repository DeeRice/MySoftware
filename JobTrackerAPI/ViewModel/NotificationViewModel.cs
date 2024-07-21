using JobTrackerAPI.Model;
using static JobTrackerAPI.Enum.JTEnum;

namespace JobTrackerAPI.ViewModel
{
    public class NotificationViewModel
    {
        public int NotificationID { get; set; }
        public string ? RecruiterName { get; set; }
        public string ? RecruiterCompanyName { get; set; }
        public string ? RecruiterCompanyLocation { get; set; }
        public string ? RecruiterPhoneNumber { get; set; }
        public string ? RecruiterCompanyPhoneNumber { get; set; }
        public string ? ClientContactName { get; set; }
        public string ? ClientCompanyName { get; set; }
        public string ? ClientCompanyLocation { get; set; }
        public string ? ClientCompanyPhoneNumber { get; set; }
        public DateTime NotificationDate { get; set; }
        public NotificationEvent NotificationEvent { get; set; }
        public int FK_NotficationID_JobID { get; set; }
        public virtual JobViewModel ? JobViewModel { get; set; }
    }
}
