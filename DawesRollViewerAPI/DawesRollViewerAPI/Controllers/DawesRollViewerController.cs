using DawesRollViewerAPI.Interface;
using DawesRollViewerAPI.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Globalization;

namespace DawesRollViewerAPI.Controllers
{
    public class DawesRollViewerController : Controller, IDawesRollViewerController
    {
        private readonly IDawesRollViewerRepository _IDawesRollViewerRepository;
        private readonly IMapping _mapper;

        public DawesRollViewerController(IDawesRollViewerRepository IDawesRollViewerRepository, IMapping mapper)
        {
            _IDawesRollViewerRepository = IDawesRollViewerRepository;
            _mapper = mapper;
        }

        // GET: DawesRollViewer/GetAllCherokeeIndians
        [HttpGet]
        public async Task<JsonResult> GetAllCherokeeIndians()
        {
            var listOfAllCherokeeIndians = new List<IndianViewModel>();
            var result = await _IDawesRollViewerRepository.GetAllCherokeeIndians();
            result.ForEach(x =>
            {
                listOfAllCherokeeIndians.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(JsonConvert.SerializeObject(listOfAllCherokeeIndians));
        }

        // GET: DawesRollViewer/GetAllChickasawIndians
        [HttpGet]
        public async Task<JsonResult> GetAllChickasawIndians()
        {
            var listOfAllChickasawIndians = new List<IndianViewModel>();
            var result = await _IDawesRollViewerRepository.GetAllChickasawIndians();
            result.ForEach(x =>
            {
                listOfAllChickasawIndians.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(JsonConvert.SerializeObject(listOfAllChickasawIndians));
        }

        // GET: DawesRollViewer/GetAllChoctawIndians
        [HttpGet]
        public async Task<JsonResult> GetAllChoctawIndians()
        {
            var listOfAllChoctawIndians = new List<IndianViewModel>();
            var result = await _IDawesRollViewerRepository.GetAllChoctawIndians();
            result.ForEach(x =>
            {
                listOfAllChoctawIndians.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(JsonConvert.SerializeObject(listOfAllChoctawIndians));
        }

        // GET: DawesRollViewer/GetAllCreekIndians
        [HttpGet]
        public async Task<JsonResult> GetAllCreekIndians()
        {
            var listOfAllCreekIndians = new List<IndianViewModel>();
            var result = await _IDawesRollViewerRepository.GetAllCreekIndians();
            result.ForEach(x =>
            {
                listOfAllCreekIndians.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(JsonConvert.SerializeObject(listOfAllCreekIndians));
        }

        // GET: DawesRollViewer/GetAllIndians
        [HttpGet]
        public async Task<JsonResult> GetAllIndians()
        {
            var listOfAllIndians = new List<IndianViewModel>();
            var result = await _IDawesRollViewerRepository.GetAllIndians();
            result.ForEach(x =>
            {
                listOfAllIndians.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(JsonConvert.SerializeObject(listOfAllIndians));
        }

        // GET: DawesRollViewer/GetAllSeminoleIndians
        [HttpGet]
        public async Task<JsonResult> GetAllSeminoleIndians()
        {
            var listOfAllSeminoleIndians = new List<IndianViewModel>();
            var result = await _IDawesRollViewerRepository.GetAllSeminoleIndians();
            result.ForEach(x =>
            {
                listOfAllSeminoleIndians.Add(_mapper.MapEntityToViewModel(x));
            });
            return new JsonResult(JsonConvert.SerializeObject(listOfAllSeminoleIndians));
        }
    }
}
