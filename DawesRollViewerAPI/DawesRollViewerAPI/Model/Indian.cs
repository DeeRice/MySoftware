using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using static DawesRollViewerAPI.Enum.DRVEnum;

namespace DawesRollViewerAPI.Model
{
    public class Indian
    {
        [Key, Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Key, Column(Order = 1)]
        public int Page { get; set; }
        [Key, Column(Order = 2)]
        public string Tribe { get; set; }
        [Key, Column(Order = 3)]
        public string LastName { get; set; }
        [Key, Column(Order = 4)]
        public string FirstName { get; set; }
        [Key, Column(Order = 5)]
        public string MiddleName { get; set; }
        [Key, Column(Order = 6)]
        public string Suffix { get; set; }
        public int Age { get; set; }
        public YearOrYears Year { get; set; }
        public Sex Sex { get; set; }
        public string Blood { get; set; }
        public Relationship Relationship { get; set; }
        public int RollNum { get; set; }
        public string Source { get; set; }
    }
}
