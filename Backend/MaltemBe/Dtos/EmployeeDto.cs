using MaltemBe.Models;
using static System.String;

namespace MaltemBe.Dtos
{
    public class EmployeeDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email_address { get; set; }
        public int Phone_number { get; set; }
        public Gender Gender { get; set; }
        public int Days_worked { get; set; }

        public string Cafe { get; set; }

        public Employee MapToEmployee(Employee employee)
        {
            employee.Name = employee.Name;
            employee.Email_address = employee.Email_address;
            employee.Phone_number = employee.Phone_number;
            employee.Gender = employee.Gender;
            return employee;
        }

        public Employee MapToEmployee()
        {
            return new Employee
            {
                Id = Id,
                Name = Name,
                Email_address = Email_address,
                Phone_number = Phone_number,
                Gender = Gender,
            };
        }

        public static EmployeeDto MapFromEmployee(Employee employee)
        {
            return new EmployeeDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Email_address = employee.Email_address,
                Phone_number = employee.Phone_number,
                Gender = employee.Gender,
                Days_worked = employee.StartDate is null ? 0 : (DateTime.UtcNow - employee.StartDate.Value).Days,
                Cafe = employee.Cafe?.Name ?? Empty
            };
        }
    }
}
