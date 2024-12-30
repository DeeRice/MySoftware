using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobTrackerAPI.Model
{
    public class Job
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int JobID { get; set; }
        [Key, Column(Order = 1)]
        public int JobNumber { get; set; }
        [Key, Column(Order = 2)]
        public string JobTitle { get; set; }
        public string JobLocation { get; set; }
        public string RecruiterName { get; set; }
        public string ? ClientCompanyContactName { get; set; }
        public string RecruiterCompanyName { get; set; }
        public string ClientCompanyName { get; set; }
        public string ? RecruiterPhoneNumber { get; set; }
        public string RecruiterCompanyPhoneNumber { get; set; }
        public string ? ClientCompanyPhoneNumber { get; set; }
        public string RecruiterCompanyLocation { get; set; }
        public string ClientCompanyLocation { get; set; }
        public string ? RecruiterNotes { get; set; }
        public string ? ClientNotes { get; set; }
        public string JobDescription { get; set; }
        public DateTime DateOfSubmission { get; set; }
        public DateTime ? DateOfFollowUp { get; set; }
        public DateTime ? DateOfInterview { get; set; }
        public int ? NotificationID { get; set; }
    }
}
