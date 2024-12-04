using DawesRollViewerAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace DawesRollViewerAPI.Interface
{
    public interface IDawesRollViewerRepository
    {
        Task<List<Indians>> GetAllIndians();
        Task<List<Choctaw>> GetAllChoctawIndians();
        Task<List<Cherokee>> GetAllCherokeeIndians();
        Task<List<Creek>> GetAllCreekIndians();
        Task<List<Chickasaw>> GetAllChickasawIndians();
        Task<List<Seminole>> GetAllSeminoleIndians();
    }
}
