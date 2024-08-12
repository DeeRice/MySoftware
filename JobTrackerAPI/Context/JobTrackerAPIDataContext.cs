using JobTrackerAPI.Interface;
using JobTrackerAPI.Model;
using JobTrackerAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System.Reflection.Emit;
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
                b.HasKey(e => new { e.JobID, e.JobNumber, e.JobTitle });
                b.Property(e => e.JobID).UseIdentityColumn();
                b.Property(e => e.JobID).ValueGeneratedOnAdd().
                Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Save);
                

            });
            modelBuilder.Entity<Notification>(b =>
            {
                b.HasKey(e => new { e.NotificationID, e.NotificationNumber});
                b.Property(e => e.NotificationID).UseIdentityColumn();
                b.Property(e => e.NotificationID).ValueGeneratedOnAdd().
                Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Save);
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
