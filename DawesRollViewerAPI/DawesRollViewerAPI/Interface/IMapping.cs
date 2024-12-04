using DawesRollViewerAPI.Model;
using DawesRollViewerAPI.ViewModel;

namespace DawesRollViewerAPI.Interface
{
    public interface IMapping
    {
        IndiansViewModel MapEntityToViewModel(Indians indian);
        Indians MapViewModelToEntity(IndiansViewModel indianViewModel);
    }
}
