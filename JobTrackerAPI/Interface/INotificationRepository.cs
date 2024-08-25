using JobTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Interface
{
    public interface INotificationRepository
    {
        Task<List<Notification>> GetAllNotifications();
        Task<Notification> GetNotificationByID(int? notificationID);
        Task<Notification> CreateNotification(Notification notification);
        Task<Notification?> FindNotification(Notification notification);
        Task<Notification> EditNotification(Notification notification);
        Task<Notification> DeleteNotification(int? notificationID);
        bool NotificationExists(int? notificationID);
        bool NotificationJobIDExist(int? jobID);
        int? GetLastNotificationID();
        DbSet<Notification> PopulateDataSet(DbSet<Notification> Notifications);
    }
}
