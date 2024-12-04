using DawesRollViewerAPI.Context;
using DawesRollViewerAPI.Interface;
using DawesRollViewerAPI.Model;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlTypes;

namespace DawesRollViewerAPI.Repository
{
    public class DawesRollViewerRepository : IDawesRollViewerRepository
    {
        public DawesRollViewerAPIDataContext _appDbContext;


        public DawesRollViewerRepository(DawesRollViewerAPIDataContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }
        public async Task<List<Cherokee>> GetAllCherokeeIndians()
        {
            return await _appDbContext.Cherokee.ToListAsync();
        }

        public async Task<List<Chickasaw>> GetAllChickasawIndians()
        {
            return await _appDbContext.Chickasaw.ToListAsync();
        }

        public async Task<List<Choctaw>> GetAllChoctawIndians()
        {
                return await _appDbContext.Choctaw.ToListAsync(); 
        }

        public async Task<List<Creek>> GetAllCreekIndians()
        {
            return await _appDbContext.Creek.ToListAsync();
        }

        public async Task<List<Indians>> GetAllIndians()
        {
            return null;
        }

        public async Task<List<Seminole>> GetAllSeminoleIndians()
        {
            return await _appDbContext.Seminole.ToListAsync();
        }
    }
}
