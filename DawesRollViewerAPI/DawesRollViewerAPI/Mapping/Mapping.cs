using DawesRollViewerAPI.Interface;
using DawesRollViewerAPI.Model;
using DawesRollViewerAPI.ViewModel;

namespace DawesRollViewerAPI.Mapping
{
    public class Mapping : IMapping
    {
        public IndiansViewModel MapEntityToViewModel(Indians indian)
        {
            IndiansViewModel indianViewModel = new IndiansViewModel();
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
            indianViewModel.Url = indian.Url;
            return indianViewModel;
        }

        public Indians MapViewModelToEntity(IndiansViewModel indianViewModel)
        {
            Indians indian = new Indians();
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
            indian.Url = indianViewModel.Url;
            return indian;
        }
    }
}
