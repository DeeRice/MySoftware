using DawesRollViewerAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace DawesRollViewerAPI.Interface
{
    public interface IDawesRollViewerRepository
    {
        Task<List<Indian>> GetAllIndians();
        Task<List<Indian>> GetAllChoctawIndians();
        Task<List<Indian>> GetAllCherokeeIndians();
        Task<List<Indian>> GetAllCreekIndians();
        Task<List<Indian>> GetAllChickasawIndians();
        Task<List<Indian>> GetAllSeminoleIndians();
    }
}
