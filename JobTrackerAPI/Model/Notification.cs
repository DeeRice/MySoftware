using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using static JobTrackerAPI.Enum.JTEnum;
using JobTrackerAPI.ViewModel;

namespace JobTrackerAPI.Model
{
    public class Notification
    {
        [Key]
        public int  NotificationID { get; set; }
        public int NotificationNumber { get; set; }
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
        public int NotificationEvent { get; set; }

        public string Message { get; set; }
    }
}
