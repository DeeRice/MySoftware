using JobTrackerAPI.Interface;
using JobTrackerAPI.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JobTrackerAPI.Controllers
{
   
    public class JobController : ControllerBase, IJobController
    {
        private readonly IJobRepository _IJobRepository;
        private readonly IMapping _mapper;

        public JobController(IJobRepository IJobRepository, IMapping mapper)
        {
            _IJobRepository = IJobRepository;
            _mapper = mapper;
        }

        // GET: Users/GetAllUsers


        [HttpGet]
        public async Task<JsonResult> GetAllJobs()
        {
            var listOfAllJobs = new List<JobViewModel>();
            var result = await _IJobRepository.GetAllJobs();
            result.ForEach(x =>
            {
                listOfAllJobs.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(listOfAllJobs);
        }

        // GET: Users/GetUser/5
        [HttpGet]
        public async Task<JsonResult> GetJobByID(int? JobID)
        {

            var jobViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.GetJobByID(JobID));
            if (jobViewModel == null)
            {

                return new JsonResult(new Exception("Could Not Find User With Specified ID").Message.ToJson());
            }

            return new JsonResult(jobViewModel);
        }


        // POST: Users/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]

        public async Task<JsonResult> CreateJob([FromBody] JobViewModel JobViewModel)
        {

            if (ModelState.IsValid)
            {
                if (JobExists(JobViewModel.JobID) == false)
                {
                    var userEntity = _mapper.MapViewModelToEntity(JobViewModel);
                    var returnedViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.CreateJob(userEntity));
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
        public async Task<JsonResult> FindJob(int? JobID)
        {
            var jobViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.FindJob(JobID));
            if (jobViewModel == null)
            {
                return new JsonResult(new Exception("Could Not Find User With The Submitted ID.").Message.ToJson());
            }
            return new JsonResult(jobViewModel);
        }

        // POST: Users/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]

        public async Task<JsonResult> EditJob(int? JobID, [FromBody] JobViewModel JobViewModel)
        {
            if (JobViewModel == null)
            {
                return new JsonResult(new Exception("a user was not submitted to be updated.").Message.ToJson());
            }
            if (JobID != JobViewModel.JobID)
            {
                return new JsonResult(new Exception("the id sent with the request does not match the id in the user object").Message.ToJson());
            }

            if (ModelState.IsValid)
            {
                try
                {
                    if (JobExists(JobID))
                    {
                        var userEntity = _mapper.MapViewModelToEntity(JobViewModel);
                        var returnedViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.EditJob(JobID, userEntity));
                        return new JsonResult(returnedViewModel);
                    }
                    else
                    {
                        return new JsonResult(new Exception("the user being edited is not found in the database").Message.ToJson());
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!JobExists(JobViewModel.JobID))
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

        public async Task<JsonResult> DeleteJob(int? JobID)
        {
            var job = await _IJobRepository.FindJob(JobID);
            if (job != null)
            {
                var returnedViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.DeleteJob(JobID));
                return new JsonResult(returnedViewModel);
            }
            else
            {
                return new JsonResult(new Exception("could not find the user to delete.").Message.ToJson());
            }
        }

        public bool JobExists(int? JobID)
        {
            return _IJobRepository.JobExists(JobID);
        }
    }
}
