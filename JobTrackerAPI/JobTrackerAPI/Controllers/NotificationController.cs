using JobTrackerAPI.Interface;
using JobTrackerAPI.Repository;
using JobTrackerAPI.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NuGet.Protocol;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JobTrackerAPI.Controllers
{
 
    public class NotificationController : ControllerBase, INotificationController
    {
        private readonly INotificationRepository _INotificationRepository;
        private readonly IJobRepository _IJobRepository;
        private readonly IMapping _mapper;

        public NotificationController(INotificationRepository INotificationRepository, IJobRepository IJobRepository, IMapping mapper)
        {
            _INotificationRepository = INotificationRepository;
            _IJobRepository = IJobRepository;
            _mapper = mapper;
        }

        // GET: Notification/GetAllNotifications


        [HttpGet]
        public async Task<JsonResult> GetAllNotifications()
        {
            var listOfAllNotifications = new List<NotificationViewModel>();
            var notificationResults = await _INotificationRepository.GetAllNotifications();
            var JobResults = await _IJobRepository.GetAllJobs();
            notificationResults.ForEach(x =>
            {
                x.Job = JobResults.Where(y => y.JobID == x.JobID).FirstOrDefault();
                listOfAllNotifications.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(JsonConvert.SerializeObject(listOfAllNotifications));
        }

        // GET: Notification/GetNotification/5
        [HttpGet]
        public async Task<JsonResult> GetNotificationByID(int? NotificationID)
        {
            var notification = await _INotificationRepository.GetNotificationByID(NotificationID);
            var job = await _IJobRepository.GetJobByID(notification.JobID);
            notification.Job = job;
            var notificationViewModel = _mapper.MapEntityToViewModel(notification);
            if (notificationViewModel == null)
            {

                return new JsonResult(new Exception("Could Not Find Notification With Specified ID").Message.ToJson());
            }

            return new JsonResult(JsonConvert.SerializeObject(notificationViewModel));
        }


        // POST: Notification/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ActionName("CreateNotification")]
        [AcceptVerbs("application/json")]
        public async Task<JsonResult> CreateNotification([FromBody]NotificationViewModel NotificationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (
                    NotificationExists(NotificationViewModel.NotificationID) == false
                    &&
                    NotificationJobIDExist(NotificationViewModel.JobID) == false
                    )
                {
                    var notificationEntity = _mapper.MapViewModelToEntity(NotificationViewModel);
                    var returnedViewModel = _mapper.MapEntityToViewModel(await _INotificationRepository.CreateNotification(notificationEntity));
                    return new JsonResult(JsonConvert.SerializeObject(returnedViewModel));
                }
                else
                {
                    return new JsonResult(new Exception("the notification that was attempted to be created already exist in the database or there is already a notification for this job").Message.ToJson());
                }
            }
            return new JsonResult(new Exception("error occurred while trying to create a notification. Please check to make sure all value are accurate").Message.ToJson());
        }

        // GET: Notification/FindNotification/5
        [HttpGet]
        public async Task<JsonResult> FindNotification(NotificationViewModel? Notification)
        {
            if (Notification == null)
            {
                return new JsonResult(new Exception("Could Not Find Notification With The Submitted ID.").Message.ToJson());
            }
            else
            {
                var job = await _IJobRepository.GetJobByID(Notification.JobID);
                var notification = _mapper.MapViewModelToEntity(Notification);
                notification.Job = job;
                var notificationFound = await _INotificationRepository.FindNotification(notification);
                notificationFound.Job = job;
                var notificationViewModel = _mapper.MapEntityToViewModel(notificationFound);
                if (notificationViewModel == null)
                {
                    return new JsonResult(new Exception("Could Not Find Notification With The Submitted ID.").Message.ToJson());
                }
                return new JsonResult(JsonConvert.SerializeObject(notificationViewModel));
            }
        }

        // POST: Notification/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]

        public async Task<JsonResult> EditNotification([FromBody] NotificationViewModel NotificationViewModel)
        {
            if (NotificationViewModel.NotificationID == null)
            {
                return new JsonResult(new Exception("a notification was not submitted to be updated.").Message.ToJson());
            }
            if (NotificationExists(NotificationViewModel.NotificationID) == false)
            {
                return new JsonResult(new Exception("the notification being edited is not found in the database").Message.ToJson());
            }

            if (ModelState.IsValid)
            {
                try
                {
                    if (NotificationExists(NotificationViewModel.NotificationID))
                    {
                        var notificationEntity = _mapper.MapViewModelToEntity(NotificationViewModel);
                        var job = await _IJobRepository.GetJobByID(NotificationViewModel.JobID);
                        notificationEntity.Job = job;
                        var returnedViewModel = _mapper.MapEntityToViewModel(await _INotificationRepository.EditNotification(notificationEntity));
                        return new JsonResult(JsonConvert.SerializeObject(returnedViewModel));
                    }
                    else
                    {
                        return new JsonResult(new Exception("the notification being edited is not found in the database").Message.ToJson());
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NotificationExists(NotificationViewModel.NotificationID))
                    {
                        return new JsonResult(new Exception("the notification being edited is not found in the database").Message.ToJson());
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return new JsonResult(new Exception("Something went wrong. Please check all data from the request and make sure it is valid.").Message.ToJson());
        }

        // POST: Notification/Delete/5
        [HttpDelete]

        public async Task<JsonResult> DeleteNotification(int? NotificationID)
        {
            var notification = await _INotificationRepository.GetNotificationByID(NotificationID);
            if(notification == null)
            {
                return new JsonResult(new Exception("could not find the notification in the database to delete.").Message.ToJson());
            }
            else
            {
                var job = await _IJobRepository.GetJobByID(notification.JobID);
                if (notification != null)
                {
                    notification.Job = job;
                    var returnedViewModel = _mapper.MapEntityToViewModel(await _INotificationRepository.DeleteNotification(NotificationID));
                    return new JsonResult(JsonConvert.SerializeObject(returnedViewModel));
                }
                else
                {
                    return new JsonResult(new Exception("could not find the notification to delete.").Message.ToJson());
                }
            }
          
        }

        public bool NotificationExists(int? NotificationViewModel)
        {
            return _INotificationRepository.NotificationExists(NotificationViewModel);
        }
        public bool NotificationJobIDExist(int? JobID)
        {
            bool jobIDExist = _INotificationRepository.NotificationJobIDExist(JobID);
            return jobIDExist;
        }
        public JsonResult GetLastNotificationID()
        {
            int? lastNotificationID = _INotificationRepository.GetLastNotificationID();
            return new JsonResult(JsonConvert.SerializeObject(lastNotificationID));
        }
    }
}
