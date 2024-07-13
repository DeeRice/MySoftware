﻿using static JobTrackerAPI.Enum.JTEnum;

namespace JobTrackerAPI.ViewModel
{
    public class NotificationViewModel
    {
        public int NotificationID;
        public string RecruiterName;
        public string RecruiterCompanyName;
        public string RecruiterCompanyLocation;
        public string RecruiterPhoneNumber;
        public string RecruiterCompanyPhoneNumber;
        public string ClientContactName;
        public string ClientCompanyName;
        public string ClientCompanyLocation;
        public string ClientCompanyPhoneNumber;
        public string NotificationDate;
        public NotificationEvent NotificationEvent;
    }
}