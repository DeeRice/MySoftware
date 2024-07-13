using JobTrackerAPI.Model;
using JobTrackerAPI.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Interface
{
    public interface IJobController
    {
        Task<JsonResult> GetAllJobs();
        Task<JsonResult> GetJobByID(int? JobID);
        Task<JsonResult> CreateJob([Bind("UserID,Username,FirstName,LastName,Email,UserStatus,Department")] JobViewModel JobViewModel);
        Task<JsonResult> FindJob(int? JobID);
        Task<JsonResult> EditJob(int? JobID, [Bind("UserID,Username,FirstName,LastName,Email,UserStatus,Department")] JobViewModel JobViewModel);
        Task<JsonResult> DeleteJob(int? JobID);
        bool JobExists(int? JobID);
    }
}
