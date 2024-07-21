using JobTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Interface
{
    public interface IJobRepository
    {
        Task<List<Job>> GetAllJobs();
        Task<Job> GetJobByID(int? JobID);
        Task<Job> CreateJob(Job Job);
        Task<Job> FindJob(int? JobID);
        Task<Job> EditJob(int? JobID, Job Job);
        Task<Job> DeleteJob(int? JobID);
        bool JobExists(int? JobID);
        Task<int?> GetLastJobID();
        DbSet<Job> PopulateDataSet(DbSet<Job> Jobs);
    }
}
