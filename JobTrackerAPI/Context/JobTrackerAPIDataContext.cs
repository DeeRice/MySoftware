using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
using JobTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Xml;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Job>(b =>
            {
                b.HasKey(e => e.JobID);
                b.Property(e => e.JobID).ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<Notification>(b =>
            {
                b.HasKey(e => e.NotificationID);
                b.Property(e => e.NotificationID).ValueGeneratedOnAdd();
            });
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
