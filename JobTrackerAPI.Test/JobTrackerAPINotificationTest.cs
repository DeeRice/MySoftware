using JobTrackerAPI.Controllers;
using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
using JobTrackerAPI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            List<NotificationViewModel> okResult = JsonConvert.DeserializeObject<List<NotificationViewModel>>(result.Value.ToJson());

            // Assert test
            Assert.AreEqual(okResult?.Count, 0);
        }


        [TestMethod]
        public void GetAllNotificationsReturnsAListNotifications()
        {     // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            var notification = new Notification() { user_id = 1, first_name = "john", last_name = "doe" };
            var notificationViewModel = new NotificationViewModel() { UserID = 1, FirstName = "john", LastName = "doe" };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.GetAllNotifications()).Returns(Task.FromResult(list));
            iMapper.Setup(x => x.MapEntityToViewModel(user)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.GetAllNotifications();

            }).Wait();
            List<NotificationViewModel> okResult = JsonConvert.DeserializeObject<List<NotificationViewModel>>(result.Value.ToJson());

            // Assert test
            Assert.AreEqual(okResult?.Count, 1);


        }

        [TestMethod]
        public void GetNotificationByIDReturnsANotification()
        {
            // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            var notification = new Notification() { user_id = 1, first_name = "john", last_name = "doe" };
            var notificationViewModel = new NotificationViewModel() { UserID = 1, FirstName = "john", LastName = "doe" };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.GetNotificationByID(notification.user_id)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapEntityToViewModel(user)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.GetNotificationByID(notificationViewModel.UserID);

            }).Wait();
            NotificationViewModel okResult = JsonConvert.DeserializeObject<NotificationViewModel>(result.Value.ToJson());

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
            string exceptionMessage = "Could Not Find notification With Specified ID";
            NotificationViewModel notificationViewModel = null;
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.GetNotificationByID(0)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapEntityToViewModel(notification)).Returns(notificationViewModel);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.GetUserByID(0);

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

                result = await controller.EditNotification(0, notificationViewModel);

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
            Notification notification = null;
            string exceptionMessage = "the notification being edited is not found in the database";
            var notificationViewModel = new NotificationViewModel() { UserID = 1, FirstName = "john", LastName = "doe" };
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
        public void EditNotificationReturnsMisMatchIDMessage()
        {
            // Arrange test
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            var iMapper = new Mock<IMapping>();
            Notification notification = null;
            string exceptionMessage = "the id sent with the request does not match the id in the notification object";
            var notificationViewModel = new UserViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
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
            Notification notification = new Notification() { user_id = 1, first_name = "john", last_name = "doe" };
            var notificationViewModel = new NotificationViewModel() { UserID = 1, FirstName = "john", LastName = "doe" };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            iMockNotificationRepository.Setup(x => x.NotificationExists(notificationViewModel.UserID)).Returns(true);
            iMockNotificationRepository.Setup(x => x.EditUser(1, user)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.EditNotification(notificationViewModel.UserID, notificationViewModel);

            }).Wait();
            Notification okResult = JsonConvert.DeserializeObject<Notification>(result.Value.ToJson());

            // Assert test
            Assert.AreEqual(okResult.ToJson(), notification.ToJson());
        }

        [TestMethod]
        public void CreateNotificationReturnsADuplicateUserMessage()
        {
            // Arrange test
            Notification notification = new Notification() { user_id = 0, first_name = "john", last_name = "doe" };
            var notificationViewModel = new NotificationViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "the user that was attempted to be created already exist in the database";
            iMockNotificationRepository.Setup(x => x.CreateNotification(notification)).Returns(Task.FromResult(notification));
            iMockNotificationRepository.Setup(x => x.NotificationExists(notification.user_id)).Returns(true);
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
        public void CreateNotificationReturnsAOneForSuccess()
        {
            // Arrange test
            Notification notification = new Notification() { user_id = 1, first_name = "john", last_name = "doe" };
            var notificationViewModel = new NotificationViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "the notification that was attempted to be created already exist in the database";
            iMockNotificationRepository.Setup(x => x.CreateNotification(notification)).Returns(Task.FromResult(notification));
            iMockNotificationRepository.Setup(x => x.NotificationExists(notification.user_id)).Returns(false);
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.CreateNotification(notificationViewModel);

            }).Wait();
            Notification okResult = JsonConvert.DeserializeObject<Notification>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult.ToJson(), notification.ToJson());
        }

        [TestMethod]
        public void DeleteUserReturnsAOneForSuccess()
        {
            // Arrange test
            Notification notification = new Notification() { user_id = 0, first_name = "john", last_name = "doe" };
            var notificationViewModel = new NotificationViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
            List<Notification> list = new List<Notification>();
            list.Add(notification);
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "the notification that was attempted to be created already exist in the database";
            iMockNotificationRepository.Setup(x => x.DeleteNotification(notification.user_id)).Returns(Task.FromResult(notification));
            iMockNotificationRepository.Setup(x => x.NotificationExists(notification.user_id)).Returns(true);
            iMockNotificationRepository.Setup(x => x.FindNotification(notification.user_id)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.DeleteNotification(notificationViewModel.UserID);

            }).Wait();
            Notification okResult = JsonConvert.DeserializeObject<Notification>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult.ToJson(), notification.ToJson());
        }

        [TestMethod]
        public void DeleteNotificationReturnsANotificationNotFound()
        {
            // Arrange test
            Notification notification = new Notification() { user_id = 1, first_name = "john", last_name = "doe" };
            var notificationViewModel = new NotificationViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
            List<Notification> list = new List<Notification>();
            //list.Add(user);
            var query = GetQueryableMockDbSet<Notification>(list);
            var iMapper = new Mock<IMapping>();
            var iMockNotificationRepository = new Mock<INotificationRepository>();
            iMockNotificationRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
            string exceptionMessage = "could not find the notification to delete.";
            iMockNotificationRepository.Setup(x => x.DeleteNotification(notification.user_id)).Returns(Task.FromResult(notification));
            iMockNotificationRepository.Setup(x => x.NotificationExists(notification.user_id)).Returns(true);
            iMockNotificationRepository.Setup(x => x.FindNotification(notification.user_id)).Returns(Task.FromResult(notification));
            iMapper.Setup(x => x.MapViewModelToEntity(notificationViewModel)).Returns(notification);
            var controller = new NotificationController(iMockNotificationRepository.Object, iMapper.Object);
            JsonResult? result = null;

            // Act test
            Task.Run(async () =>
            {

                result = await controller.DeleteUser(userViewModel.UserID);

            }).Wait();
            string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

            // Assert test
            Assert.AreEqual(okResult, exceptionMessage);
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
