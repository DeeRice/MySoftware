using Microsoft.AspNetCore.Mvc;
using static DawesRollViewerAPI.Enum.DRVEnum;

namespace DawesRollViewerAPI.ViewModel
{
    public class IndianViewModel
    {
        [BindProperty(Name = "ID", SupportsGet = true)]
        public int ID { get; set; }
        [BindProperty(Name = "Page", SupportsGet = true)]
        public int Page { get; set; }
        [BindProperty(Name = "Tribe", SupportsGet = true)]
        public string Tribe { get; set; }
        [BindProperty(Name = "LastName", SupportsGet = true)]
        public string LastName { get; set; }
        [BindProperty(Name = "FirstName", SupportsGet = true)]
        public string FirstName { get; set; }
        [BindProperty(Name = "MiddleName", SupportsGet = true)]
        public string MiddleName { get; set; }
        [BindProperty(Name = "Suffix", SupportsGet = true)]
        public string Suffix { get; set; }
        [BindProperty(Name = "Age", SupportsGet = true)]
        public int Age { get; set; }
        [BindProperty(Name = "YearOrYears", SupportsGet = true)]
        public YearOrYears Year { get; set; }
        [BindProperty(Name = "Sex", SupportsGet = true)]
        public Sex Sex { get; set; }
        [BindProperty(Name = "Blood", SupportsGet = true)]
        public string Blood { get; set; }
        [BindProperty(Name = "Relationship", SupportsGet = true)]
        public Relationship Relationship { get; set; }
        [BindProperty(Name = "RollNum", SupportsGet = true)]
        public int RollNum { get; set; }
        [BindProperty(Name = "Source", SupportsGet = true)]
        public string Source { get; set; }
    }
}
