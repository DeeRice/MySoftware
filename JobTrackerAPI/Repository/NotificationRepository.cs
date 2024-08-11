using IntegraPartnersContactApplicationAPI;
using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
using JobTrackerAPI.ViewModel;
using Microsoft.EntityFrameworkCore;
using static JobTrackerAPI.Enum.JTEnum;

namespace JobTrackerAPI.Repository
{
    public class NotificationRepository : INotificationRepository
    {
        public JobTrackerAPIDataContext _appDbContext;


        public NotificationRepository(JobTrackerAPIDataContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        public async Task<List<Notification>> GetAllNotifications()
        {
            return await _appDbContext.Notification.ToListAsync();
        }

        public async Task<Notification> GetNotificationByID(int? notificationID)
        {
            try
            {
                return await _appDbContext.Notification
                    .FirstOrDefaultAsync(e => e.NotificationID == notificationID);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Notification> CreateNotification(Notification notification)
        {
            if (notification != null)
            {
                try
                {

                    notification.NotificationID = 0;
                    var result = await _appDbContext.Notification.AddAsync(notification);
                    await _appDbContext.SaveChangesAsync();
                    Notification updatedNotification = _appDbContext.Notification.FirstOrDefault(x => x.NotificationID == notification.NotificationID);
                    return updatedNotification;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public async Task<Notification> EditNotification(int? notificationID, Notification notification)
        {
            try
            {
                var result = await _appDbContext.Notification
                    .FirstOrDefaultAsync(e => e.NotificationID == notification.NotificationID);

                if (result != null)
                {
                    result.NotificationID = notification.NotificationID;
                    result.NotificationNumber = notification.NotificationNumber;
                    result.RecruiterName = notification.RecruiterName;
                    result.RecruiterCompanyName = notification.RecruiterCompanyName;
                    result.RecruiterCompanyLocation = notification.RecruiterCompanyLocation;
                    result.RecruiterPhoneNumber = notification.RecruiterPhoneNumber;
                    result.RecruiterCompanyPhoneNumber = notification.RecruiterCompanyPhoneNumber;
                    result.ClientContactName = notification.ClientContactName;
                    result.ClientCompanyName = notification.ClientCompanyName;
                    result.ClientCompanyLocation = notification.ClientCompanyLocation;
                    result.ClientCompanyPhoneNumber = notification.ClientCompanyPhoneNumber;
                    result.NotificationDate = notification.NotificationDate;
                    result.NotificationEvent = notification.NotificationEvent;
                    result.Message = notification.Message;
                    result.JobID = notification.JobID;
                    result.JobNumber = notification.JobNumber;
                    result.JobTitle = notification.JobTitle;
                    await _appDbContext.SaveChangesAsync();

                    Notification updatedNotification = _appDbContext.Notification.FirstOrDefault(x => x.NotificationID == notification.NotificationID);
                    return updatedNotification;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return null;
        }

        public async Task<Notification> DeleteNotification(int? notificationID)
        {
            var result = await _appDbContext.Notification
                .FirstOrDefaultAsync(e => e.NotificationID == notificationID);
            if (result != null)
            {
                var removeNotification = _appDbContext.Notification.FirstOrDefault(x => x.NotificationID == notificationID);
                _appDbContext.Notification.Remove(result);
                await _appDbContext.SaveChangesAsync();
                return removeNotification;
            }
            else
            {
                return null;
            }
        }

        public async Task<Notification> FindNotification(int? notificationID)
        {
            var notification = await _appDbContext.Notification.FindAsync(notificationID);
            return notification;
        }

        public bool NotificationExists(int? notificationID)
        {
            var result = _appDbContext.Notification.Any(e => e.NotificationID == notificationID);
            return result;
        }

        public async Task<int?> GetLastNotificationID()
        {
            int? lastNotificationID = _appDbContext?.Notification?.OrderByDescending(x => x.NotificationID).FirstOrDefault()?.NotificationID;
            return lastNotificationID;
        }

        public DbSet<Notification> PopulateDataSet(DbSet<Notification> Notifications)
        {
            _appDbContext.Notification = Notifications;
            return _appDbContext.Notification;
        }
    }
}

