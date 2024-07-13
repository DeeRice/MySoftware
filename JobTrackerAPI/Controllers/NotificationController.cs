using JobTrackerAPI.Interface;
using JobTrackerAPI.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JobTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase, INotificationController
    {
        private readonly INotificationRepository _INotificationRepository;
        private readonly IMapping _mapper;

        public NotificationController(INotificationRepository INotificationRepository, IMapping mapper)
        {
            _INotificationRepository = INotificationRepository;
            _mapper = mapper;
        }

        // GET: Users/GetAllUsers


        [HttpGet]
        public async Task<JsonResult> GetAllNotifications()
        {
            var listOfAllNotifications = new List<NotificationViewModel>();
            var result = await _INotificationRepository.GetAllNotifications();
            result.ForEach(x =>
            {
                listOfAllNotifications.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(listOfAllNotifications);
        }

        // GET: Users/GetUser/5
        [HttpGet]
        public async Task<JsonResult> GetNotificationByID(int? NotificationID)
        {

            var notificationViewModel = _mapper.MapEntityToViewModel(await _INotificationRepository.GetNotificationByID(NotificationID));
            if (notificationViewModel == null)
            {

                return new JsonResult(new Exception("Could Not Find User With Specified ID").Message.ToJson());
            }

            return new JsonResult(notificationViewModel);
        }


        // POST: Users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]

        public async Task<JsonResult> CreateNotification([FromBody] NotificationViewModel NotificationViewModel)
        {

            if (ModelState.IsValid)
            {
                if (NotificationExists(NotificationViewModel.NotificationID) == false)
                {
                    var notificationEntity = _mapper.MapViewModelToEntity(NotificationViewModel);
                    var returnedViewModel = _mapper.MapEntityToViewModel(await _INotificationRepository.CreateNotification(notificationEntity));
                    return new JsonResult(returnedViewModel);
                }
                else
                {
                    return new JsonResult(new Exception("the user that was attempted to be created already exist in the database").Message.ToJson());
                }
            }
            return new JsonResult(new Exception("error occurred while trying to create a user. Please check to make sure all value are accurate").Message.ToJson());
        }

        // GET: Users/FindUser/5
        [HttpGet]
        public async Task<JsonResult> FindNotification(int? NotificationID)
        {
            var notificationViewModel = _mapper.MapEntityToViewModel(await _INotificationRepository.FindNotification(NotificationID));
            if (notificationViewModel == null)
            {
                return new JsonResult(new Exception("Could Not Find User With The Submitted ID.").Message.ToJson());
            }
            return new JsonResult(notificationViewModel);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]

        public async Task<JsonResult> EditNotification(int? NotificationID, [FromBody] NotificationViewModel NotificationViewModel)
        {
            if (NotificationID == null)
            {
                return new JsonResult(new Exception("a user was not submitted to be updated.").Message.ToJson());
            }
            if (NotificationID != NotificationViewModel.NotificationID)
            {
                return new JsonResult(new Exception("the id sent with the request does not match the id in the user object").Message.ToJson());
            }

            if (ModelState.IsValid)
            {
                try
                {
                    if (NotificationExists(NotificationID))
                    {
                        var notificationEntity = _mapper.MapViewModelToEntity(NotificationViewModel);
                        var returnedViewModel = _mapper.MapEntityToViewModel(await _INotificationRepository.EditNotification(NotificationID, notificationEntity));
                        return new JsonResult(returnedViewModel);
                    }
                    else
                    {
                        return new JsonResult(new Exception("the user being edited is not found in the database").Message.ToJson());
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NotificationExists(NotificationViewModel.NotificationID))
                    {
                        return new JsonResult(new Exception("the user being edited is not found in the database").Message.ToJson());
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return new JsonResult(new Exception("Something went wrong. Please check all data from the request and make sure it is valid.").Message.ToJson());
        }

        // POST: Users/Delete/5
        [HttpDelete]

        public async Task<JsonResult> DeleteNotification(int? NotificationID)
        {
            var notification = await _INotificationRepository.FindNotification(NotificationID);
            if (notification != null)
            {
                var returnedViewModel = _mapper.MapEntityToViewModel(await _INotificationRepository.DeleteNotification(NotificationID));
                return new JsonResult(returnedViewModel);
            }
            else
            {
                return new JsonResult(new Exception("could not find the user to delete.").Message.ToJson());
            }
        }

        public bool NotificationExists(int? NotificationViewModel)
        {
            return _INotificationRepository.NotificationExists(NotificationViewModel);
        }
    }
}
