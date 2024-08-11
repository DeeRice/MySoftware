using JobTrackerAPI.Controllers;
using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
using JobTrackerAPI.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Moq;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NuGet.Protocol;
using System.Collections.Generic;
using System.Data;
using System.Text.Json;
using System.Text.Json.Nodes;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static JobTrackerAPI.Enum.JTEnum;


namespace JobTrackerAPI.Test
{
    [TestClass]
    public class JobTrackerAPINotificationTest
    {
        [TestMethod]
        public void GetAllNotificationsReturnsAnEmptyList()
        {
            // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            iMockNotificationRepository.Setup(x => x.GetAllNotifications()).Returns(Task.FromResult(new List<Notification>()));
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.GetAllNotifications();

            }).Wait();
            List<NotificationViewModel> okResult = JsonConvert.DeserializeObject<List<NotificationViewModel>>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult?.Count, 0);
        }


        [TestMethod]
        public void GetAllNotificationsReturnsAListNotifications()
        {     // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            var notification = new Notification() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = (int)NotificationEvent.NotSet,
        };
            var notificationViewModel = new NotificationViewModel() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = NotificationEvent.NotSet
            };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.GetAllNotifications()).Returns(Task.FromResult(list));
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.GetAllNotifications();

            }).Wait();
            List<NotificationViewModel> okResult = JsonConvert.DeserializeObject<List<NotificationViewModel>>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult?.Count, 1);


        }

        [TestMethod]
        public void GetNotificationByIDReturnsANotification()
        {
            // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            var notification = new Notification() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime()
            };
            var notificationViewModel = new NotificationViewModel() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = NotificationEvent.NotSet
            };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.GetNotificationByID(notification.NotificationID)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.GetNotificationByID(notificationViewModel.NotificationID);

            }).Wait();
            NotificationViewModel okResult = JsonConvert.DeserializeObject<NotificationViewModel>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult.ToJson(), notificationViewModel.ToJson());
        }

        [TestMethod]
        public void GetNotificationByIDReturnsANotificationNotFoundMessage()
        {
            // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            Notification notification = null;
            string exceptionMessage = "Could Not Find Notification With Specified ID";
            NotificationViewModel notificationViewModel = null;
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.GetNotificationByID(1000)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.GetNotificationByID(1000);

            }).Wait();
            string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult, exceptionMessage);
        }

        [TestMethod]
        public void EditNotificationReturnsANotificationNotSubmittedMessage()
        {
            // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            Notification notification = null;
            string exceptionMessage = "a notification was not submitted to be updated.";
            NotificationViewModel notificationViewModel = null;
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.EditNotification(0, notification)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.EditNotification(null, notificationViewModel);

            }).Wait();
            string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult, exceptionMessage);
        }

        [TestMethod]
        public void EditNotificationReturnsANotificationNotFoundMessage()
        {
            // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            string exceptionMessage = "the notification being edited is not found in the database";
            Notification notification = new Notification()
            {
                NotificationID = 1000,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = (int)NotificationEvent.NotSet
            };
            var notificationViewModel = new NotificationViewModel() 
            {
                NotificationID = 1000,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = NotificationEvent.NotSet
            };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            bool notficationExist = false;
            iMockNotificationRepository.Setup(x => x.EditNotification(1000, notification)).Returns(Task.FromResult(notification));
            iMockNotificationRepository.Setup(x => x.NotificationExists(notificationViewModel.NotificationID)).Returns(notficationExist);
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.EditNotification(1000, notificationViewModel);

            }).Wait();
            string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult, exceptionMessage);
        }

        [TestMethod]
        public void EditNotificationReturnsMisMatchIDMessage()
        {
            // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            string exceptionMessage = "the id sent with the request does not match the id in the notification object";
            Notification notification = new Notification()
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = (int)NotificationEvent.NotSet
            };
            var notificationViewModel = new NotificationViewModel() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = NotificationEvent.NotSet
            };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.EditNotification(0, notification)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.EditNotification(1, notificationViewModel);

            }).Wait();
            string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult, exceptionMessage);
        }

        [TestMethod]
        public void EditNotificationReturnsAOneForSuccess()
        {
            // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            Notification notification = new Notification() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = (int)NotificationEvent.NotSet
            };
            var notificationViewModel = new NotificationViewModel() 
            {
                NotificationID = 0,
                RecruiterName = "The Recruiter",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = NotificationEvent.NotSet
            };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.NotificationExists(notificationViewModel.NotificationID)).Returns(true);
            iMockNotificationRepository.Setup(x => x.EditNotification(0, notification)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.EditNotification(notificationViewModel.NotificationID, notificationViewModel);

            }).Wait();
            NotificationViewModel okResult = JsonConvert.DeserializeObject<NotificationViewModel>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult.ToJson(), notificationViewModel.ToJson());
        }

        [TestMethod]
        public void CreateNotificationReturnsADuplicateUserMessage()
        {
            // Arrange test
            Notification notification = new Notification() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = (int)NotificationEvent.NotSet
            };
            var notificationViewModel = new NotificationViewModel() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = NotificationEvent.NotSet
            };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "the user that was attempted to be created already exist in the database";
            iMockNotificationRepository.Setup(x => x.CreateNotification(notification)).Returns(Task.FromResult(notification));
            iMockNotificationRepository.Setup(x => x.NotificationExists(notification.NotificationID)).Returns(true);
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.CreateNotification(notificationViewModel);

            }).Wait();
            string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult, exceptionMessage);
        }

        [TestMethod]
        public void CreateNotificationReturnsANotificationForSuccess()
        {
            // Arrange test
            Notification notification = new Notification() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = (int)NotificationEvent.NotSet
            };
            var notificationViewModel = new NotificationViewModel() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = NotificationEvent.NotSet
            };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "the notification that was attempted to be created already exist in the database";
            iMockNotificationRepository.Setup(x => x.CreateNotification(notification)).Returns(Task.FromResult(notification));
            iMockNotificationRepository.Setup(x => x.NotificationExists(notification.NotificationID)).Returns(false);
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.CreateNotification(notificationViewModel);

            }).Wait();
            NotificationViewModel okResult = JsonConvert.DeserializeObject<NotificationViewModel>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult.ToJson(), notificationViewModel.ToJson());
        }

        [TestMethod]
        public void DeleteUserReturnsAOneForSuccess()
        {
            // Arrange test
            Notification notification = new Notification() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = (int)NotificationEvent.NotSet
            };
            var notificationViewModel = new NotificationViewModel() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime()
            };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "the notification that was attempted to be created already exist in the database";
            iMockNotificationRepository.Setup(x => x.DeleteNotification(notification.NotificationID)).Returns(Task.FromResult(notification));
            iMockNotificationRepository.Setup(x => x.NotificationExists(notification.NotificationID)).Returns(true);
            iMockNotificationRepository.Setup(x => x.FindNotification(notification.NotificationID)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.DeleteNotification(notificationViewModel.NotificationID);

            }).Wait();
            NotificationViewModel okResult = JsonConvert.DeserializeObject<NotificationViewModel>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult.ToJson(), notificationViewModel.ToJson());
        }

        [TestMethod]
        public void DeleteNotificationReturnsANotificationNotFound()
        {
            // Arrange test
            Notification notification = new Notification() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = (int)NotificationEvent.NotSet
            };
            var notificationViewModel = new NotificationViewModel() 
            {
                NotificationID = 0,
                RecruiterName = "",
                RecruiterCompanyName = "",
                RecruiterCompanyLocation = "",
                RecruiterPhoneNumber = "",
                RecruiterCompanyPhoneNumber = "",
                ClientContactName = "",
                ClientCompanyName = "",
                ClientCompanyLocation = "",
                ClientCompanyPhoneNumber = "",
                NotificationDate = new DateTime(),
                NotificationEvent = NotificationEvent.NotSet
            };
            List<Notification> list = new List<Notification>();
            //list.Add(user);
            Notification myNotification = null;
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "could not find the notification to delete.";
            iMockNotificationRepository.Setup(x => x.DeleteNotification(notification.NotificationID)).Returns(Task.FromResult(notification));
            iMockNotificationRepository.Setup(x => x.NotificationExists(notification.NotificationID)).Returns(false);
            iMockNotificationRepository.Setup(x => x.FindNotification(notification.NotificationID)).Returns(Task.FromResult(myNotification));
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.DeleteNotification(notificationViewModel.NotificationID);

            }).Wait();
            string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult, exceptionMessage);
        }

        [TestMethod]
        public void GetLastNotificationIDReturnsNull()
        {
            // Arrange test
            int? notificationID = null;

            List<Notification> list = new List<Notification>();
            //list.Add(user);
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "could not find the job to delete.";
            iMockNotificationRepository.Setup(x => x.GetLastNotificationID()).Returns(Task.FromResult<int?>(null));
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.GetLastNotificationID();

            }).Wait();
            int? okResult = JsonConvert.DeserializeObject<int?>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult, notificationID);
        }

        [TestMethod]
        public void GetLastNotificationIDReturnsANotificationID()
        {
            // Arrange test
            int? notificationID = 1;

            List<Notification> list = new List<Notification>();
            //list.Add(user);
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "could not find the job to delete.";
            iMockNotificationRepository.Setup(x => x.GetLastNotificationID()).Returns(Task.FromResult<int?>(1));
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.GetLastNotificationID();

            }).Wait();
            int? okResult = JsonConvert.DeserializeObject<int?>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult, notificationID);
        }

        public static DbSet<T> GetQueryableMockDbSet<T>(List<T> sourceList) where T : class
        {
            var queryable = sourceList.AsQueryable();

            var dbSet = new Mock<DbSet<T>>();
            dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
            dbSet.Setup(d => d.Add(It.IsAny<T>())).Callback<T>((s) => sourceList.Add(s));

            return dbSet.Object;
        }
    }
}
