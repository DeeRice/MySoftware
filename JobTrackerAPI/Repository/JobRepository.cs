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

        public async Task<Job> GetJobByID(int? JobID)
        {
            try
            {
                return await _appDbContext.Job
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
                   
                    var result = await _appDbContext.Job.AddAsync(Job);
                    await _appDbContext.SaveChangesAsync();
                    Job updatedJob = _appDbContext.Job.FirstOrDefault(x => x.JobID == Job.JobID);
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
                var result = await _appDbContext.Job
                    .FirstOrDefaultAsync(e => e.JobID == Job.JobID);

                if (result != null)
                {

                    result.JobID = Job.JobID;
                    result.JobNumber = Job.JobNumber;
                    result.JobTitle = Job.JobTitle;
                    result.JobLocation = Job.JobLocation;
                    result.RecruiterName = Job.RecruiterName;
                    result.ClientCompanyContactName = Job.ClientCompanyContactName;
                    result.RecruiterCompanyName = Job.RecruiterCompanyName;
                    result.ClientCompanyName = Job.ClientCompanyName;
                    result.RecruiterPhoneNumber = Job.RecruiterPhoneNumber;
                    result.ClientCompanyPhoneNumber = Job.ClientCompanyPhoneNumber;
                    result.RecruiterCompanyLocation = Job.RecruiterCompanyLocation;
                    result.ClientCompanyLocation = Job.ClientCompanyLocation;
                    result.RecruiterNotes = Job.RecruiterNotes;
                    result.ClientNotes = Job.ClientNotes;
                    result.JobDescription = Job.JobDescription;
                    result.DateOfSubmission = Job.DateOfSubmission;
                    result.DateOfFollowUp = Job.DateOfFollowUp;
                    result.DateOfInterview = Job.DateOfInterview;
                    result.FK_JobID_NotficationID = Job.FK_JobID_NotficationID;
                    result.Notification = Job.Notification;
                    result.NotificationID = Job.NotificationID;
                    await _appDbContext.SaveChangesAsync();

                    Job updatedJob = _appDbContext.Job.FirstOrDefault(x => x.JobID == Job.JobID);
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
            var result = await _appDbContext.Job
                .FirstOrDefaultAsync(e => e.JobID == JobID);
            if (result != null)
            {
                var removeJob = _appDbContext.Job.FirstOrDefault(x => x.JobID == JobID);
                _appDbContext.Job.Remove(result);
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
            var job = await _appDbContext.Job.FindAsync(JobID);
            return job;
        }

        public bool JobExists(int? JobID)
        {
            var result = _appDbContext.Job.Any(e => e.JobID == JobID);
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

