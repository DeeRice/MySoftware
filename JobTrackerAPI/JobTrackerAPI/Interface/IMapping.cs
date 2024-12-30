using JobTrackerAPI.Model;
using JobTrackerAPI.ViewModel;

namespace JobTrackerAPI.Interface
{
    public interface IMapping
    {
        NotificationViewModel MapEntityToViewModel(Notification notification);
        Notification MapViewModelToEntity(NotificationViewModel notificationViewModel);

        JobViewModel MapEntityToViewModel(Job job);
        Job MapViewModelToEntity(JobViewModel jobViewModel);
    }
}
