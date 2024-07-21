using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
using JobTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace IntegraPartnersContactApplicationAPI
{
    public class JobTrackerAPIDataContext : DbContext
    {
        public JobTrackerAPIDataContext(DbContextOptions<JobTrackerAPIDataContext> options)
            : base(options)
        {
        }
        public JobTrackerAPIDataContext()
        {

        }

       
        public virtual DbSet<Job> Job { get; set; } = null!;
        public virtual DbSet<Notification> Notification { get; set; } = null!;

        public new int SaveChanges()
        {
            return base.SaveChanges();
        }

        public Task<int> SavingChangesAsync()
        {
            return base.SaveChangesAsync();
        }
    }
}
