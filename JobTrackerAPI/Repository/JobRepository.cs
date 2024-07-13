using IntegraPartnersContactApplicationAPI;
using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Repository
{
    public class JobRepository : IJobRepository
    {
        public JobTrackerAPIDataContext _appDbContext;


        public JobRepository(JobTrackerAPIDataContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        public async Task<List<Job>> GetAllJobs()
        {
            return await _appDbContext.Jobs.ToListAsync();
        }

        public async Task<Job> GetJobByID(int? JobID)
        {
            try
            {
                return await _appDbContext.Jobs
                    .FirstOrDefaultAsync(e => e.JobID == JobID);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Job> CreateJob(Job Job)
        {
            if (Job != null)
            {
                try
                {
                    Job = null;
                    var result = await _appDbContext.Jobs.AddAsync(Job);

                    await _appDbContext.SaveChangesAsync();
                    Job updatedJob = _appDbContext.Jobs.FirstOrDefault(x => x.JobID == Job.JobID);
                    return updatedJob;
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

        public async Task<Job> EditJob(int? JobID, Job Job)
        {
            try
            {
                var result = await _appDbContext.Jobs
                    .FirstOrDefaultAsync(e => e.JobID == Job.JobID);

                if (result != null)
                {

                    result.JobID = Job.JobID;
                    result.JobTitle = Job.JobTitle;
                    result.JobLocation = Job.JobLocation;
                    result.RecruiterName = Job.RecruiterName;
                    result.ClientContactName = Job.ClientContactName;
                    result.RecruiterCompanyName = Job.RecruiterCompanyName;
                    result.ClientCompanyName = Job.ClientCompanyName;
                    result.RecruiterPhoneNumber = Job.RecruiterPhoneNumber;
                    result.ClientPhoneNumber = Job.ClientPhoneNumber;
                    result.RecruiterCompanyLocation = Job.RecruiterCompanyLocation;
                    result.ClientCompanyLocation = Job.ClientCompanyLocation;
                    result.RecruiterNotes = Job.RecruiterNotes;
                    result.ClientNotes = Job.ClientNotes;
                    result.JobDescription = Job.JobDescription;
                    result.DateOfSubmission = Job.DateOfSubmission;
                    result.DateOfFollowUp = Job.DateOfFollowUp;
                    result.DateOfInterview = Job.DateOfInterview;




                    await _appDbContext.SaveChangesAsync();

                    Job updatedJob = _appDbContext.Jobs.FirstOrDefault(x => x.JobID == Job.JobID);
                    return updatedJob;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return null;
        }

        public async Task<Job> DeleteJob(int? JobID)
        {
            var result = await _appDbContext.Jobs
                .FirstOrDefaultAsync(e => e.JobID == JobID);
            if (result != null)
            {
                var removeJob = _appDbContext.Jobs.FirstOrDefault(x => x.JobID == JobID);
                _appDbContext.Jobs.Remove(result);
                await _appDbContext.SaveChangesAsync();
                return removeJob;
            }
            else
            {
                return null;
            }
        }

        public async Task<Job> FindJob(int? JobID)
        {
            var job = await _appDbContext.Jobs.FindAsync(JobID);
            return job;
        }

        public bool JobExists(int? JobID)
        {
            var result = _appDbContext.Jobs.Any(e => e.JobID == JobID);
            return result;
        }

        public DbSet<Job> PopulateDataSet(DbSet<Job> Job)
        {
            _appDbContext.Jobs = Job;
            return _appDbContext.Jobs;
        }
    }
}

