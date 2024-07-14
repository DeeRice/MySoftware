using JobTrackerAPI.Controllers;
using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
using JobTrackerAPI.ViewModel;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace JobTrackerAPI.Test
{
    [TestMethod]
    public void GetAllJobsReturnsAnEmptyList()
    {
        // Arrange test
        var iMockJobRepository = new Mock<IJobRepository>();
        var iMapper = new Mock<IMapping>();
        iMockJobRepository.Setup(x => x.GetAllJobs()).Returns(Task.FromResult(new List<Job>()));
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.GetAllJobs();

        }).Wait();
        List<JobViewModel> okResult = JsonConvert.DeserializeObject<List<JobViewModel>>(result.Value.ToJson());

        // Assert test
        Assert.AreEqual(okResult?.Count, 0);
    }


    [TestMethod]
    public void GetAllJobsReturnsAListJobs()
    {     // Arrange test
        var iMockJobRepository = new Mock<IJobRepository>();
        var iMapper = new Mock<IMapping>();
        var job = new Job() { user_id = 1, first_name = "john", last_name = "doe" };
        var jobViewModel = new JobViewModel() { UserID = 1, FirstName = "john", LastName = "doe" };
        List<Job> list = new List<Job>();
        list.Add(job);
        iMockJobRepository.Setup(x => x.GetAllJobs()).Returns(Task.FromResult(list));
        iMapper.Setup(x => x.MapEntityToViewModel(job)).Returns(jobViewModel);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.GetAllJobs();

        }).Wait();
        List<JobViewModel> okResult = JsonConvert.DeserializeObject<List<JobViewModel>>(result.Value.ToJson());

        // Assert test
        Assert.AreEqual(okResult?.Count, 1);


    }

    [TestMethod]
    public void GetJobByIDReturnsAJob()
    {
        // Arrange test
        var iMockJobRepository = new Mock<IJobRepository>();
        var iMapper = new Mock<IMapping>();
        var job = new Job() { user_id = 1, first_name = "john", last_name = "doe" };
        var jobViewModel = new JobViewModel() { UserID = 1, FirstName = "john", LastName = "doe" };
        List<Job > list = new List<Job>();
        list.Add(job);
        iMockJobRepository.Setup(x => x.GetJobByID(job.user_id)).Returns(Task.FromResult(job));
        iMapper.Setup(x => x.MapEntityToViewModel(job)).Returns(jobViewModel);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.GetJobByID(jobViewModel.UserID);

        }).Wait();
        JobViewModel okResult = JsonConvert.DeserializeObject<JobViewModel>(result.Value.ToJson());

        // Assert test
        Assert.AreEqual(okResult.ToJson(), jobViewModel.ToJson());
    }

    [TestMethod]
    public void GetJobByIDReturnsAJobNotFoundMessage()
    {
        // Arrange test
        var iMockJobRepository = new Mock<IJobRepository>();
        var iMapper = new Mock<IMapping>();
        Job job = null;
        string exceptionMessage = "Could Not Find Job With Specified ID";
        JobViewModel jobViewModel = null;
        List<Job> list = new List<Job>();
        list.Add(job);
        iMockJobRepository.Setup(x => x.GetJobByID(0)).Returns(Task.FromResult(job));
        iMapper.Setup(x => x.MapEntityToViewModel(job)).Returns(jobViewModel);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.GetJobByID(0);

        }).Wait();
        string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

        // Assert test
        Assert.AreEqual(okResult, exceptionMessage);
    }

    [TestMethod]
    public void EditJobReturnsAJobNotSubmittedMessage()
    {
        // Arrange test
        var iMockJobRepository = new Mock<IJobRepository>();
        var iMapper = new Mock<IMapping>();
        Job job = null;
        string exceptionMessage = "a job was not submitted to be updated.";
        JobViewModel jobViewModel = null;
        List<Job> list = new List<Job>();
        list.Add(job);
        iMockJobRepository.Setup(x => x.EditJob(0, user)).Returns(Task.FromResult(job));
        iMapper.Setup(x => x.MapEntityToViewModel(user)).Returns(jobViewModel);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.EditJob(0, jobViewModel);

        }).Wait();
        string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

        // Assert test
        Assert.AreEqual(okResult, exceptionMessage);
    }

    [TestMethod]
    public void EditJobReturnsAJobNotFoundMessage()
    {
        // Arrange test
        var iMockJobRepository = new Mock<IJobRepository>();
        var iMapper = new Mock<IMapping>();
        Job job = null;
        string exceptionMessage = "the job being edited is not found in the database";
        var jobViewModel = new JobViewModel() { UserID = 1, FirstName = "john", LastName = "doe" };
        List<Job> list = new List<Job>();
        list.Add(job);
        iMockJobRepository.Setup(x => x.EditJob(0, job)).Returns(Task.FromResult(job));
        iMapper.Setup(x => x.MapEntityToViewModel(user)).Returns(jobViewModel);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.EditJob(1, jobViewModel);

        }).Wait();
        string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

        // Assert test
        Assert.AreEqual(okResult, exceptionMessage);
    }

    [TestMethod]
    public void EditJobReturnsMisMatchIDMessage()
    {
        // Arrange test
        var iMockJobRepository = new Mock<IJobRepository>();
        var iMapper = new Mock<IMapping>();
        Job job = null;
        string exceptionMessage = "the id sent with the request does not match the id in the user object";
        var jobViewModel = new JobViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
        List<Job> list = new List<Job>();
        list.Add(job);
        iMockJobRepository.Setup(x => x.EditJob(0, job)).Returns(Task.FromResult(job));
        iMapper.Setup(x => x.MapEntityToViewModel(job)).Returns(jobViewModel);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.EditJob(1, jobViewModel);

        }).Wait();
        string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

        // Assert test
        Assert.AreEqual(okResult, exceptionMessage);
    }

    [TestMethod]
    public void EditJobReturnsAOneForSuccess()
    {
        // Arrange test
        var iMockJobRepository = new Mock<IJobRepository>();
        var iMapper = new Mock<IMapping>();
        Job job = new Job() { user_id = 1, first_name = "john", last_name = "doe" };
        var jobViewModel = new JobViewModel() { UserID = 1, FirstName = "john", LastName = "doe" };
        List<Job> list = new List<Job>();
        list.Add(job);
        iMockJobRepository.Setup(x => x.JobExists(jobViewModel.UserID)).Returns(true);
        iMockJobRepository.Setup(x => x.EditJob(1, job)).Returns(Task.FromResult(job));
        iMapper.Setup(x => x.MapViewModelToEntity(jobViewModel)).Returns(job);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.EditJob(JobViewModel.UserID, jobViewModel);

        }).Wait();
        Job okResult = JsonConvert.DeserializeObject<Job>(result.Value.ToJson());

        // Assert test
        Assert.AreEqual(okResult.ToJson(), job.ToJson());
    }

    [TestMethod]
    public void CreateJobReturnsADuplicateJobMessage()
    {
        // Arrange test
        Job job = new Job() { user_id = 0, first_name = "john", last_name = "doe" };
        var jobViewModel = new JobViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
        List<Job> list = new List<Job>();
        list.Add(job);
        var query = GetQueryableMockDbSet<Job>(list);
        var iMapper = new Mock<IMapping>();
        var iMockJobRepository = new Mock<IJobRepository>();
        iMockJobRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
        string exceptionMessage = "the job that was attempted to be created already exist in the database";
        iMockJobRepository.Setup(x => x.CreateJob(job)).Returns(Task.FromResult(job));
        iMockJobRepository.Setup(x => x.JobExists(job.user_id)).Returns(true);
        iMapper.Setup(x => x.MapViewModelToEntity(jobViewModel)).Returns(job);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.CreateJob(jobViewModel);

        }).Wait();
        string okResult = JsonConvert.DeserializeObject<string>(result.Value.ToString());

        // Assert test
        Assert.AreEqual(okResult, exceptionMessage);
    }

    [TestMethod]
    public void CreateJobReturnsAOneForSuccess()
    {
        // Arrange test
        Job job = new Job() { user_id = 1, first_name = "john", last_name = "doe" };
        var jobViewModel = new JobViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
        List<Job> list = new List<Job>();
        list.Add(job);
        var query = GetQueryableMockDbSet<Job>(list);
        var iMapper = new Mock<IMapping>();
        var iMockJobRepository = new Mock<IJobRepository>();
        iMockJobRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
        string exceptionMessage = "the job that was attempted to be created already exist in the database";
        iMockJobRepository.Setup(x => x.CreateJob(job)).Returns(Task.FromResult(job));
        iMockJobRepository.Setup(x => x.JobExists(job.user_id)).Returns(false);
        iMapper.Setup(x => x.MapViewModelToEntity(jobViewModel)).Returns(job);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.CreateJob(jobViewModel);

        }).Wait();
        Job okResult = JsonConvert.DeserializeObject<Job>(result.Value.ToString());

        // Assert test
        Assert.AreEqual(okResult.ToJson(), job.ToJson());
    }

    [TestMethod]
    public void DeleteJobReturnsAOneForSuccess()
    {
        // Arrange test
        Job job = new Job() { user_id = 0, first_name = "john", last_name = "doe" };
        var jobViewModel = new JobViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
        List<Job> list = new List<Job>();
        list.Add(job);
        var query = GetQueryableMockDbSet<Job>(list);
        var iMapper = new Mock<IMapping>();
        var iMockJobRepository = new Mock<IJobRepository>();
        iMockJobRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
        string exceptionMessage = "the job that was attempted to be created already exist in the database";
        iMockJobRepository.Setup(x => x.DeleteJob(job.user_id)).Returns(Task.FromResult(job));
        iMockJobRepository.Setup(x => x.JobExists(job.user_id)).Returns(true);
        iMockJobRepository.Setup(x => x.FindJob(job.user_id)).Returns(Task.FromResult(job));
        iMapper.Setup(x => x.MapViewModelToEntity(jobViewModel)).Returns(job);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.DeleteJob(jobViewModel.UserID);

        }).Wait();
        Job okResult = JsonConvert.DeserializeObject<Job>(result.Value.ToString());

        // Assert test
        Assert.AreEqual(okResult.ToJson(), job.ToJson());
    }

    [TestMethod]
    public void DeleteJobReturnsAJobNotFound()
    {
        // Arrange test
        Job job = new Job() { user_id = 1, first_name = "john", last_name = "doe" };
        var jobViewModel = new JobViewModel() { UserID = 0, FirstName = "john", LastName = "doe" };
        List<Job> list = new List<Job>();
        //list.Add(user);
        var query = GetQueryableMockDbSet<Job>(list);
        var iMapper = new Mock<IMapping>();
        var iMockJobRepository = new Mock<IJobRepository>();
        iMockJobRepository.Setup(x => x.PopulateDataSet(query)).Returns(query);
        string exceptionMessage = "could not find the job to delete.";
        iMockJobRepository.Setup(x => x.DeleteJob(job.user_id)).Returns(Task.FromResult(job));
        iMockJobRepository.Setup(x => x.JobExists(job.user_id)).Returns(true);
        iMockJobRepository.Setup(x => x.FindJob(job.user_id)).Returns(Task.FromResult(job));
        iMapper.Setup(x => x.MapViewModelToEntity(jobViewModel)).Returns(job);
        var controller = new JobController(iMockJobRepository.Object, iMapper.Object);
        JsonResult? result = null;

        // Act test
        Task.Run(async () =>
        {

            result = await controller.DeleteJob(jobViewModel.UserID);

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