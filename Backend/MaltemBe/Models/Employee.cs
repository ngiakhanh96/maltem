namespace MaltemBe.Models
{
    public class Employee
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email_address { get; set; }
        public int Phone_number { get; set; }
        public Gender Gender { get; set; }
        public Cafe? Cafe { get; set; }
        public DateTime? StartDate { get; set; }

    }

    public enum Gender
    {
        Male,
        Female
    }
}
