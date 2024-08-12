using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using static JobTrackerAPI.Enum.JTEnum;
using JobTrackerAPI.ViewModel;
using Microsoft.Identity.Client;

namespace JobTrackerAPI.Model
{
    public class Notification
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int  NotificationID { get; set; }
        [Key, Column(Order = 1)]
        public int NotificationNumber { get; set; }
        public string RecruiterName { get; set; }
        public string RecruiterCompanyName { get; set; }
        public string RecruiterCompanyLocation { get; set; }
        public string ? RecruiterPhoneNumber { get; set; }
        public string RecruiterCompanyPhoneNumber { get; set; }
        public string ? ClientContactName { get; set; }
        public string ClientCompanyName { get; set; }
        public string ClientCompanyLocation { get; set; }
        public string ? ClientCompanyPhoneNumber { get; set; }
        public DateTime NotificationDate { get; set; }
        public int NotificationEvent { get; set; }
        public string Message { get; set; }

       
        public int JobID { get; set; }
       
        public int JobNumber { get; set; }
       
        public string JobTitle { get; set; }
        [ForeignKey("JobID,JobNumber,JobTitle")]
        public virtual Job Job { get; set; }
    }
}
