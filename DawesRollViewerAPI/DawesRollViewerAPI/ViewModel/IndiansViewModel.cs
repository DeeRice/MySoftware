using Microsoft.AspNetCore.Mvc;
using static DawesRollViewerAPI.Enum.DRVEnum;

namespace DawesRollViewerAPI.ViewModel
{
    public class IndiansViewModel
    {
        [BindProperty(BinderType = typeof(int), Name = "ID", SupportsGet = true)]
        public int ID { get; set; }

        [BindProperty(BinderType = typeof(string), Name = "Tribe", SupportsGet = true)]
        public string Tribe { get; set; }

        [BindProperty(BinderType = typeof(int), Name = "Page", SupportsGet = true)]
        public int Page { get; set; }

        [BindProperty(BinderType = typeof(string), Name = "LastName", SupportsGet = true)]
        public string LastName { get; set; }

        [BindProperty(BinderType = typeof(string), Name = "FirstName", SupportsGet = true)]
        public string FirstName { get; set; }

        [BindProperty(BinderType = typeof(Nullable), Name = "MiddleName", SupportsGet = true)]
        public string ? MiddleName { get; set; }

        [BindProperty(BinderType = typeof(Nullable), Name = "Suffix", SupportsGet = true)]
        public string ? Suffix { get; set; }

        [BindProperty(Name = "Age", SupportsGet = true)]
        public int ? Age { get; set; }

        [BindProperty(BinderType = typeof(Nullable), Name = "YearOrYears", SupportsGet = true)]
        // public YearOrYears Year { get; set; }
        public string ? Year { get; set; }

        [BindProperty(BinderType = typeof(Nullable), Name = "Sex", SupportsGet = true)]
       // public Sex Sex { get; set; }
        public string ? Sex { get; set; }

        [BindProperty(Name = "Blood", SupportsGet = true)]
        public string ? Blood { get; set; }

        [BindProperty(BinderType = typeof(Nullable), Name = "Relationship", SupportsGet = true)]
        // public Relationship Relationship { get; set; }
        public string ? Relationship { get; set; }

        [BindProperty(BinderType = typeof(Nullable), Name = "RollNum", SupportsGet = true)]
        public int ? RollNum { get; set; }

        [BindProperty(BinderType = typeof(Nullable), Name = "Source", SupportsGet = true)]
        public string ? Source { get; set; }
    }
}
