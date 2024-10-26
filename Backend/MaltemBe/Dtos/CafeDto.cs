using MaltemBe.Models;

namespace MaltemBe.Dtos
{
    public class CafeDto
    {
        public Guid? Id { get; set; }
        //[JsonConverter(typeof(JsonToByteArrayConverter))]
        public byte[] Logo { get; set; } = [];
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int Employees { get; set; }

        public Cafe MapToCafe()
        {
            var cafe = new Cafe
            {
                Name = Name,
                Description = Description,
                Location = Location,
                Logo = Logo
            };
            if (Id is not null)
            {
                cafe.Id = Id.Value;
            }

            return cafe;
        }

        public static CafeDto MapFromCafe(Cafe cafe)
        {
            return new CafeDto
            {
                Id = cafe.Id,
                Name = cafe.Name,
                Description = cafe.Description,
                Location = cafe.Location,
                Employees = cafe.Employees.Count,
                Logo = cafe.Logo
            };
        }
    }
}
