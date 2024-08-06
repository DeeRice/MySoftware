using IntegraPartnersContactApplicationAPI;
using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
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

        public async Task<Notification> GetNotificationByID(int? NotificationID)
        {
            try
            {
                return await _appDbContext.Notification
                    .FirstOrDefaultAsync(e => e.NotificationID == NotificationID);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Notification> CreateNotification(Notification Notification)
        {
            if (Notification != null)
            {
                try
                {
                   
                   
                    var result = await _appDbContext.Notification.AddAsync(Notification);

                    await _appDbContext.SaveChangesAsync();
                    Notification updatedNotification = _appDbContext.Notification.FirstOrDefault(x => x.NotificationID == Notification.NotificationID);
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

        public async Task<Notification> EditNotification(int? NotificationID, Notification Notification)
        {
            try
            {
                var result = await _appDbContext.Notification
                    .FirstOrDefaultAsync(e => e.NotificationID == Notification.NotificationID);

                if (result != null)
                {
                    result.NotificationID = Notification.NotificationID;
                    result.NotificationNumber = Notification.NotificationNumber;
                    result.RecruiterName = Notification.RecruiterName;
                    result.RecruiterCompanyName = Notification.RecruiterCompanyName;
                    result.RecruiterCompanyLocation = Notification.RecruiterCompanyLocation;
                    result.RecruiterPhoneNumber = Notification.RecruiterPhoneNumber;
                    result.RecruiterCompanyPhoneNumber = Notification.RecruiterCompanyPhoneNumber;
                    result.ClientContactName = Notification.ClientContactName;
                    result.ClientCompanyName = Notification.ClientCompanyName;
                    result.ClientCompanyLocation = Notification.ClientCompanyLocation;
                    result.ClientCompanyPhoneNumber = Notification.ClientCompanyPhoneNumber;
                    result.NotificationDate = Notification.NotificationDate;
                    result.NotificationEvent = Notification.NotificationEvent;
                    result.Message = Notification.Message;
                    await _appDbContext.SaveChangesAsync();

                    Notification updatedNotification = _appDbContext.Notification.FirstOrDefault(x => x.NotificationID == Notification.NotificationID);
                    return updatedNotification;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return null;
        }

        public async Task<Notification> DeleteNotification(int? NotificationID)
        {
            var result = await _appDbContext.Notification
                .FirstOrDefaultAsync(e => e.NotificationID == NotificationID);
            if (result != null)
            {
                var removeNotification = _appDbContext.Notification.FirstOrDefault(x => x.NotificationID == NotificationID);
                _appDbContext.Notification.Remove(result);
                await _appDbContext.SaveChangesAsync();
                return removeNotification;
            }
            else
            {
                return null;
            }
        }

        public async Task<Notification> FindNotification(int? NotificationID)
        {
            var notification = await _appDbContext.Notification.FindAsync(NotificationID);
            return notification;
        }

        public bool NotificationExists(int? NotificationID)
        {
            var result = _appDbContext.Notification.Any(e => e.NotificationID == NotificationID);
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

