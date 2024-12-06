using Microsoft.AspNetCore.Mvc;

namespace DawesRollViewerAPI.Interface
{
    public interface IDawesRollViewerController
    {
        Task<JsonResult> GetCherokeeIndianByID(int? IndianID);
        Task<JsonResult> GetChoctawIndianByID(int? IndianID);
        Task<JsonResult> GetChickasawIndianByID(int? IndianID);
        Task<JsonResult> GetCreekIndianByID(int? IndianID);
        Task<JsonResult> GetSeminoleIndianByID(int? IndianID);

        Task<JsonResult> GetAllIndians();
        Task<JsonResult> GetAllChoctawIndians();
        Task<JsonResult> GetAllCherokeeIndians();
        Task<JsonResult> GetAllCreekIndians();
        Task<JsonResult> GetAllChickasawIndians();
        Task<JsonResult> GetAllSeminoleIndians();
    }
}
