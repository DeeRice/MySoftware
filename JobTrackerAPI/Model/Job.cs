using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JobTrackerAPI.Model
{
    public class Job
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int      JobID;
        public string   JobTitle;
        public string   JobLocation;
        public string   RecruiterName;
        public string   ClientContactName;
        public string   RecruiterCompanyName;
        public string   ClientCompanyName;
        public string   RecruiterPhoneNumber;
        public string   ClientPhoneNumber;
        public string   RecruiterCompanyLocation;
        public string   ClientCompanyLocation;
        public string   RecruiterNotes;
        public string   ClientNotes;
        public string   JobDescription;
        public DateTime DateOfSubmission;
        public DateTime DateOfFollowUp;
        public DateTime DateOfInterview;
    }
}
