using MaltemBe.Models;

namespace MaltemBe.Repositories.Interfaces
{
    public interface ICafeRepository
    {
        public Task<List<Cafe>> GetCafesByLocationAsync(string location);

        public Task<Cafe?> GetCafeByNameAsync(string name);

        public Task<Cafe> AddCafeAsync(Cafe cafe);
        public void DeleteCafe(Cafe cafe);
        public void UpdateCafe(Cafe cafe);
        public Task SaveChangesAsync();
    }
}
