using Microsoft.AspNetCore.Mvc;

namespace DawesRollViewerAPI.Interface
{
    public interface IDawesRollViewerController
    {
        Task<JsonResult> GetAllIndians();
        Task<JsonResult> GetAllChoctawIndians();
        Task<JsonResult> GetAllCherokeeIndians();
        Task<JsonResult> GetAllCreekIndians();
        Task<JsonResult> GetAllChickasawIndians();
        Task<JsonResult> GetAllSeminoleIndians();
    }
}
