using MaltemBe.Dtos;
using MaltemBe.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MaltemBe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CafesController : ControllerBase
    {
        private readonly ICafeService _cafeService;

        public CafesController(ICafeService cafeService)
        {
            _cafeService = cafeService;
        }

        [HttpGet]
        public async Task<List<CafeDto>> GetCafesByLocation([FromQuery] string location)
        {
            return await _cafeService.GetCafesByLocationAsync(location);
        }

        [HttpPost]
        public async Task CreateCafe([FromBody] CafeDto cafeDto)
        {
            await _cafeService.CreateCafeAsync(cafeDto);
        }

        [HttpPut]
        public async Task UpdateCafe([FromBody] CafeDto cafeDto)
        {
            await _cafeService.UpdateCafeAsync(cafeDto);
        }

        [HttpDelete]
        public async Task DeleteCafe([FromQuery] Guid id)
        {
            await _cafeService.DeleteCafeAsync(id);
        }
    }
}
