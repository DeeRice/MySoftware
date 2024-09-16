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
            return await _appDbContext.Job.ToListAsync();
        }

        public async Task<Job> GetJobByID(int? jobID)
        {
            try
            {
                return await _appDbContext.Job
                    .FirstOrDefaultAsync(e => e.JobID == jobID);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Job> CreateJob(Job job)
        {
            if (job != null)
            {
                try
                {
                    job.JobID = 0;
                    var result = await _appDbContext.Job.AddAsync(job);
                    await _appDbContext.SaveChangesAsync();
                    Job updatedJob = _appDbContext.Job.FirstOrDefault(x => x.JobID == job.JobID);
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

        public async Task<Job> EditJob(Job job)
        {
            try
            {
                var result = await _appDbContext.Job
                    .FirstOrDefaultAsync(e => e.JobID == job.JobID);

                if (result != null)
                {

                    result.JobID = job.JobID;
                    result.JobNumber = job.JobNumber;
                    result.JobTitle = job.JobTitle;
                    result.JobLocation = job.JobLocation;
                    result.RecruiterName = job.RecruiterName;
                    result.ClientCompanyContactName = job.ClientCompanyContactName;
                    result.RecruiterCompanyName = job.RecruiterCompanyName;
                    result.ClientCompanyName = job.ClientCompanyName;
                    result.RecruiterPhoneNumber = job.RecruiterPhoneNumber;
                    result.RecruiterCompanyPhoneNumber = job.RecruiterCompanyPhoneNumber;
                    result.ClientCompanyPhoneNumber = job.ClientCompanyPhoneNumber;
                    result.RecruiterCompanyLocation = job.RecruiterCompanyLocation;
                    result.ClientCompanyLocation = job.ClientCompanyLocation;
                    result.RecruiterNotes = job.RecruiterNotes;
                    result.ClientNotes = job.ClientNotes;
                    result.JobDescription = job.JobDescription;
                    result.DateOfSubmission = job.DateOfSubmission;
                    result.DateOfFollowUp = job.DateOfFollowUp;
                    result.DateOfInterview = job.DateOfInterview;
                    result.NotificationID = job.NotificationID;
                    await _appDbContext.SaveChangesAsync();

                    Job updatedJob = _appDbContext.Job.FirstOrDefault(x => x.JobID == job.JobID);
                    return updatedJob;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return null;
        }

        public async Task<Job> DeleteJob(int? jobID)
        {
            var result = await _appDbContext.Job
                .FirstOrDefaultAsync(e => e.JobID == jobID);
            if (result != null)
            {
                var removeJob = _appDbContext.Job.FirstOrDefault(x => x.JobID == jobID);
                _appDbContext.Job.Remove(result);
                await _appDbContext.SaveChangesAsync();
                return removeJob;
            }
            else
            {
                return null;
            }
        }

        public async Task<Job?> FindJob(Job? job)
        {
            var jobFound = await _appDbContext.Job.FindAsync(job.JobID, job.JobNumber, job.JobTitle);
            return jobFound;
        }

        public bool JobExists(int? jobID)
        {
            var result = _appDbContext.Job.Any(e => e.JobID == jobID);
            return result;
        }

        public async Task<int ?> GetLastJobID()
        {
           int ? lastJobID = _appDbContext?.Job?.OrderByDescending(x => x.JobID).FirstOrDefault()?.JobID;
            return lastJobID;
        }

        public DbSet<Job> PopulateDataSet(DbSet<Job> Job)
        {
            _appDbContext.Job = Job;
            return _appDbContext.Job;
        }
    }
}

