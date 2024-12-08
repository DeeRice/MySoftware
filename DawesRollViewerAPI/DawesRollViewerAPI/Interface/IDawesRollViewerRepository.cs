using DawesRollViewerAPI.Model;
using Microsoft.AspNetCore.Mvc;

namespace DawesRollViewerAPI.Interface
{
    public interface IDawesRollViewerRepository
    {
        Task<Cherokee> GetCherokeeIndianByID(int? IndianID);
        Task<Choctaw> GetChoctawIndianByID(int? IndianID);
        Task<Chickasaw> GetChickasawIndianByID(int? IndianID);
        Task<Creek> GetCreekIndianByID(int? IndianID);
        Task<Seminole> GetSeminoleIndianByID(int? IndianID);
        Task<List<Indians>> GetAllIndians();
        Task<List<Choctaw>> GetAllChoctawIndians();
        Task<List<Cherokee>> GetAllCherokeeIndians();
        Task<List<Creek>> GetAllCreekIndians();
        Task<List<Chickasaw>> GetAllChickasawIndians();
        Task<List<Seminole>> GetAllSeminoleIndians();
    }
}
