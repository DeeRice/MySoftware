using DawesRollViewerAPI.Interface;
using DawesRollViewerAPI.Model;
using DawesRollViewerAPI.ViewModel;

namespace DawesRollViewerAPI.Mapping
{
    public class Mapping : IMapping
    {
        public IndianViewModel MapEntityToViewModel(Indian indian)
        {
            IndianViewModel indianViewModel = new IndianViewModel();
            indianViewModel.ID = indian.ID;
            indianViewModel.Page = indian.Page;
            indianViewModel.Tribe = indian.Tribe;
            indianViewModel.LastName = indian.LastName;
            indianViewModel.FirstName = indian.FirstName;
            indianViewModel.MiddleName = indian.MiddleName;
            indianViewModel.Suffix = indian.Suffix;
            indianViewModel.Age = indian.Age;
            indianViewModel.Year = indian.Year;
            indianViewModel.Sex = indian.Sex;
            indianViewModel.Blood = indian.Blood;
            indianViewModel.Relationship = indian.Relationship;
            indianViewModel.RollNum = indian.RollNum;
            indianViewModel.Source = indian.Source;
            return indianViewModel;
        }

        public Indian MapViewModelToEntity(IndianViewModel indianViewModel)
        {
            Indian indian = new Indian();
            indian.ID = indianViewModel.ID;
            indian.Page = indianViewModel.Page;
            indian.Tribe = indianViewModel.Tribe;
            indian.LastName = indianViewModel.LastName;
            indian.FirstName = indianViewModel.FirstName;
            indian.MiddleName = indianViewModel.MiddleName;
            indian.Suffix = indianViewModel.Suffix;
            indian.Age = indianViewModel.Age;
            indian.Year = indianViewModel.Year;
            indian.Sex = indianViewModel.Sex;
            indian.Blood = indianViewModel.Blood;
            indian.Relationship = indianViewModel.Relationship;
            indian.RollNum = indianViewModel.RollNum;
            indian.Source = indianViewModel.Source;
            return indian;
        }
    }
}
