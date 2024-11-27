using DawesRollViewerAPI.Context;
using DawesRollViewerAPI.Interface;
using DawesRollViewerAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace DawesRollViewerAPI.Repository
{
    public class DawesRollViewerRepository : IDawesRollViewerRepository
    {
        public DawesRollViewerAPIDataContext _appDbContext;


        public DawesRollViewerRepository(DawesRollViewerAPIDataContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }
        public async Task<List<Indian>> GetAllCherokeeIndians()
        {
            return await _appDbContext.Indian.ToListAsync();
        }

        public async Task<List<Indian>> GetAllChickasawIndians()
        {
            return await _appDbContext.Indian.ToListAsync();
        }

        public async Task<List<Indian>> GetAllChoctawIndians()
        {
            return await _appDbContext.Indian.ToListAsync();
        }

        public async Task<List<Indian>> GetAllCreekIndians()
        {
            return await _appDbContext.Indian.ToListAsync();
        }

        public async Task<List<Indian>> GetAllIndians()
        {
            return await _appDbContext.Indian.ToListAsync();
        }

        public async Task<List<Indian>> GetAllSeminoleIndians()
        {
            return await _appDbContext.Indian.ToListAsync();
        }
    }
}
