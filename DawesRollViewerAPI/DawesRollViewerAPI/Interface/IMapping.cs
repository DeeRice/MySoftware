using DawesRollViewerAPI.Model;
using DawesRollViewerAPI.ViewModel;

namespace DawesRollViewerAPI.Interface
{
    public interface IMapping
    {
        IndianViewModel MapEntityToViewModel(Indian indian);
        Indian MapViewModelToEntity(IndianViewModel indianViewModel);
    }
}
