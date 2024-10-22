using MaltemBe.Models;

namespace MaltemBe.Dtos
{
    public class CafeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int Employees { get; set; }

        public Cafe MapToCafe()
        {
            return new Cafe
            {
                Id = Id,
                Name = Name,
                Description = Description,
                Location = Location
            };
        }

        public static CafeDto MapFromCafe(Cafe cafe)
        {
            return new CafeDto
            {
                Id = cafe.Id,
                Name = cafe.Name,
                Description = cafe.Description,
                Location = cafe.Location,
                Employees = cafe.Employees.Count
            };
        }
    }
}
