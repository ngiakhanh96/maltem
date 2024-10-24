using MaltemBe.Dtos;

namespace MaltemBe.Services.Interfaces
{
    public interface ICafeService
    {
        public Task<List<CafeDto>> GetCafesByLocationAsync(string? location);

        public Task CreateCafeAsync(CafeDto cafe);

        public Task UpdateCafeAsync(CafeDto cafe);

        public Task DeleteCafeAsync(Guid cafeId);
    }
}
