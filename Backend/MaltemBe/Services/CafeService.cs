using MaltemBe.Dtos;
using MaltemBe.Models;
using MaltemBe.Repositories.Interfaces;
using MaltemBe.Services.Interfaces;

namespace MaltemBe.Services
{
    public class CafeService : ICafeService
    {
        private readonly ICafeRepository _cafeRepository;
        public CafeService(ICafeRepository cafeRepository)
        {
            _cafeRepository = cafeRepository;
        }

        public async Task<List<CafeDto>> GetCafesByLocationAsync(string location)
        {
            var cafes = await _cafeRepository.GetCafesByLocationAsync(location);
            return cafes.OrderByDescending(cf => cf.Employees.Count).Select(CafeDto.MapFromCafe).ToList();
        }

        public async Task CreateCafeAsync(CafeDto cafe)
        {
            await _cafeRepository.AddCafeAsync(cafe.MapToCafe());
            await _cafeRepository.SaveChangesAsync();
        }

        public async Task UpdateCafeAsync(CafeDto cafe)
        {
            _cafeRepository.UpdateCafe(cafe.MapToCafe());
            await _cafeRepository.SaveChangesAsync();
        }

        public async Task DeleteCafeAsync(Guid cafeId)
        {
            _cafeRepository.DeleteCafe(new Cafe { Id = cafeId });
            await _cafeRepository.SaveChangesAsync();
        }
    }
}
