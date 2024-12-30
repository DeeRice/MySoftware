using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using static DawesRollViewerAPI.Enum.DRVEnum;

namespace DawesRollViewerAPI.Model
{
    public class Indians
    {
        [Required]
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Required]
        [Key, Column(Order = 1)]
        public string Tribe { get; set; }

        [Required]
        [Key, Column(Order = 2)]
        public int Page { get; set; }

        [Required]
        [Key, Column(Order = 3)]
        public string LastName { get; set; }

        [Required]
        [Key, Column(Order = 4)]
        public string FirstName { get; set; }

        public string ? MiddleName { get; set; }
        public string ? Suffix { get; set; }

        public int ? Age { get; set; }
        //        public YearOrYears Year { get; set; }
        //        public Sex Sex { get; set; }

        
        public string ? Year { get; set; }

        
        public string ? Sex { get; set; }


        // percentage
        public string ? Blood { get; set; }


      //  public Relationship Relationship { get; set; }
        public string ? Relationship { get; set; }


        public int ? RollNum { get; set; }


        public string ? Source { get; set; }

        public string? Url { get; set; }
    }

    public class Cherokee : Indians
    {
        public Cherokee() { }
    }
    public class Choctaw : Indians
    {
        public Choctaw() { }
    }
    public class Chickasaw : Indians
    {
        public Chickasaw() { }
    }
    public class Creek : Indians
    {
        public Creek() { }
    }
    public class Seminole : Indians
    {
        public Seminole() { }
    }
}
