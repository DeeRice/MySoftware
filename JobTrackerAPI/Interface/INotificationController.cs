using JobTrackerAPI.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace JobTrackerAPI.Interface
{
    public interface INotificationController
    {
        Task<JsonResult> GetAllNotifications();
        Task<JsonResult> GetNotificationByID(int? notificationID);
        Task<JsonResult> CreateNotification([Bind("UserID,Username,FirstName,LastName,Email,UserStatus,Department")] NotificationViewModel notificationViewModel);
        Task<JsonResult> FindNotification(int? notificationID);
        Task<JsonResult> EditNotification(int? notificationID, [Bind("UserID,Username,FirstName,LastName,Email,UserStatus,Department")] NotificationViewModel notificationViewModel);
        Task<JsonResult> DeleteNotification(int? notificationID);
        bool NotificationExists(int? notificationID);
    }
}
