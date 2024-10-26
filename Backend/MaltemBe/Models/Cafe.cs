namespace MaltemBe.Models
{
    public class Cafe
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public byte[] Logo { get; set; } = [];
        public ICollection<Employee> Employees { get; } = new List<Employee>();

        public void AddEmployee(Employee employee, DateTime? startDate = null)
        {
            Employees.Add(employee);
            employee.StartDate = startDate ?? DateTime.UtcNow;
            employee.Cafe = this;
        }

        public void RemoveEmployee(Employee employee)
        {
            Employees.Remove(employee);
            employee.StartDate = null;
            employee.Cafe = null;
        }
    }
}
