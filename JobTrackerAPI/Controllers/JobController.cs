﻿using JobTrackerAPI.Interface;
using JobTrackerAPI.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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

        // GET: Job/GetAllJobs


        [HttpGet]
        public async Task<JsonResult> GetAllJobs()
        {
            var listOfAllJobs = new List<JobViewModel>();
            var result = await _IJobRepository.GetAllJobs();
            result.ForEach(x =>
            {
                listOfAllJobs.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(JsonConvert.SerializeObject(listOfAllJobs));
        }

        // GET: Job/GetJob/5
        [HttpGet]
        public async Task<JsonResult> GetJobByID(int? JobID)
        {

            var jobViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.GetJobByID(JobID));
            if (jobViewModel == null)
            {

                return new JsonResult(new Exception("Could Not Find Job With Specified ID").Message.ToJson());
            }

            return new JsonResult(JsonConvert.SerializeObject(jobViewModel));
        }


        // POST: Job/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ActionName("CreateJob")]
        [AcceptVerbs("application/json")]
        public async Task<JsonResult> CreateJob([FromBody]JobViewModel JobViewModel)
        {

            if (ModelState.IsValid)
            {
                if (JobExists(JobViewModel.JobID) == false)
                {
                    var jobEntity = _mapper.MapViewModelToEntity(JobViewModel);
                    var returnedViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.CreateJob(jobEntity));
                    return new JsonResult(JsonConvert.SerializeObject(returnedViewModel));
                }
                else
                {
                    return new JsonResult(new Exception("the job that was attempted to be created already exist in the database").Message.ToJson());
                }
            }
            return new JsonResult(new Exception("error occurred while trying to create a job. Please check to make sure all value are accurate").Message.ToJson());
        }

        // GET: Job/FindJob/5
        [HttpGet]
        public async Task<JsonResult> FindJob(JobViewModel? Job)
        {
            var job = _mapper.MapViewModelToEntity(Job);
            var jobViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.FindJob(job));
            if (jobViewModel == null)
            {
                return new JsonResult(new Exception("Could Not Find Job With The Submitted ID.").Message.ToJson());
            }
            return new JsonResult(JsonConvert.SerializeObject(jobViewModel));
        }

        // POST: Job/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]

        public async Task<JsonResult> EditJob([FromBody] JobViewModel JobViewModel)
        {
            if (JobViewModel == null)
            {
                return new JsonResult(new Exception("a job was not submitted to be updated.").Message.ToJson());
            }
         
            if (ModelState.IsValid)
            {
                try
                {
                    if (JobExists(JobViewModel.JobID))
                    {
                        var jobEntity = _mapper.MapViewModelToEntity(JobViewModel);
                        var returnedViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.EditJob(jobEntity));
                        return new JsonResult(JsonConvert.SerializeObject(returnedViewModel));
                    }
                    else
                    {
                        return new JsonResult(new Exception("the job being edited is not found in the database").Message.ToJson());
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!JobExists(JobViewModel.JobID))
                    {
                        return new JsonResult(new Exception("the job being edited is not found in the database").Message.ToJson());
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return new JsonResult(new Exception("Something went wrong. Please check all data from the request and make sure it is valid.").Message.ToJson());
        }

        // POST: Job/Delete/5
        [HttpDelete]

        public async Task<JsonResult> DeleteJob(int? JobID)
        {
            var job = await _IJobRepository.GetJobByID(JobID);
            var jobFound = await _IJobRepository.FindJob(job);
            if (jobFound != null)
            {
                if(jobFound.NotificationID > 0)
                {
                    return new JsonResult(new Exception("please delete notification attached to this job before deleting this job.").Message.ToJson());
                }
                else
                {
                    var returnedViewModel = _mapper.MapEntityToViewModel(await _IJobRepository.DeleteJob(JobID));
                    return new JsonResult(JsonConvert.SerializeObject(returnedViewModel));
                }
            }
            else
            {
                return new JsonResult(new Exception("could not find the job to delete.").Message.ToJson());
            }
        }

        public bool JobExists(int? JobID)
        {
            return _IJobRepository.JobExists(JobID);
        }

        public async Task<JsonResult> GetLastJobID()
        {
          int ? lastJobID = await _IJobRepository.GetLastJobID();
          return new JsonResult(JsonConvert.SerializeObject(lastJobID));
        }
    }
}
