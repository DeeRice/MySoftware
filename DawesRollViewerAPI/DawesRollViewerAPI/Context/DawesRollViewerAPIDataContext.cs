using DawesRollViewerAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DawesRollViewerAPI.Context
{
    public class DawesRollViewerAPIDataContext : DbContext
    {
        public DawesRollViewerAPIDataContext(DbContextOptions<DawesRollViewerAPIDataContext> options)
           : base(options)
        {
        }
        public DawesRollViewerAPIDataContext()
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Indian>(b =>
            {
                b.HasKey(e => new { e.JobID, e.JobNumber, e.JobTitle });
                b.Property(e => e.JobID).UseIdentityColumn();
                b.Property(e => e.JobID).ValueGeneratedOnAdd().
                Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Save);


            });
        }

        public virtual DbSet<Indian> Indian { get; set; } = null!;

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
