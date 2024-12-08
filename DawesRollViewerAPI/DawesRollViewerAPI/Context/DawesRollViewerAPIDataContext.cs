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
            modelBuilder.Entity<Cherokee>(b =>
            {
                b.HasKey(e => new { e.ID, e.Page, e.Tribe, e.LastName, 
                    e.FirstName });
                b.Property(e => e.ID).UseIdentityColumn();
                b.Property(e => e.ID).ValueGeneratedOnAdd().
                Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Save);
            });
            modelBuilder.Entity<Choctaw>(b =>
            {
                b.HasKey(e => new {e.ID, e.Page, e.Tribe,e.LastName,
                    e.FirstName
                });
                b.Property(e => e.ID).UseIdentityColumn();
                b.Property(e => e.ID).ValueGeneratedOnAdd().
                Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Save);


            });
            modelBuilder.Entity<Chickasaw>(b =>
            {
                b.HasKey(e => new {e.ID,e.Page,e.Tribe,e.LastName,
                    e.FirstName
                });
                b.Property(e => e.ID).UseIdentityColumn();
                b.Property(e => e.ID).ValueGeneratedOnAdd().
                Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Save);
            });
            modelBuilder.Entity<Creek>(b =>
            {
                b.HasKey(e => new {e.ID, e.Page, e.Tribe, e.LastName,
                    e.FirstName
                });
                b.Property(e => e.ID).UseIdentityColumn();
                b.Property(e => e.ID).ValueGeneratedOnAdd().
                Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Save);
            });
            modelBuilder.Entity<Seminole>(b =>
            {
                b.HasKey(e => new {e.ID, e.Page, e.Tribe, e.LastName,
                    e.FirstName
                });
                b.Property(e => e.ID).UseIdentityColumn();
                b.Property(e => e.ID).ValueGeneratedOnAdd().
                Metadata.SetBeforeSaveBehavior(PropertySaveBehavior.Save);
            });
        }

        public virtual DbSet<Cherokee> Cherokee { get; set; } = null!;
        public virtual DbSet<Choctaw> Choctaw { get; set; } = null!;
        public virtual DbSet<Chickasaw> Chickasaw { get; set; } = null!;
        public virtual DbSet<Creek> Creek { get; set; } = null!;
        public virtual DbSet<Seminole> Seminole { get; set; } = null!;

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
