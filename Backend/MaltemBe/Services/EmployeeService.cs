using MaltemBe.Dtos;
using MaltemBe.Models;
using MaltemBe.Repositories.Interfaces;
using MaltemBe.Services.Interfaces;

namespace MaltemBe.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ICafeRepository _cafeRepository;
        private static Random _rand = new();

        public EmployeeService(IEmployeeRepository employeeRepository, ICafeRepository cafeRepository)
        {
            _employeeRepository = employeeRepository;
            _cafeRepository = cafeRepository;
        }

        public async Task<List<EmployeeDto>> GetEmployeesByCafeNameAsync(string? cafeName)
        {
            List<Employee> employees;
            if (cafeName is not null)
            {
                var cafe = await _cafeRepository.GetCafeByNameAsync(cafeName);
                employees = cafe?.Employees.ToList() ?? [];
            }
            else
            {
                employees = await _employeeRepository.GetAllEmployees();
            }

            return employees.Select(EmployeeDto.MapFromEmployee).OrderByDescending(p => p.Days_worked).ToList();
        }

        public async Task CreateEmployeeAsync(EmployeeDto employeeDto)
        {
            var cafe = await _cafeRepository.GetCafeByNameAsync(employeeDto.Cafe);
            var employee = employeeDto.MapToEmployee();
            employee.Id = GenerateEmployeeId();
            if (cafe is not null)
            {
                employee.StartDate = DateTime.UtcNow;
                cafe.Employees.Add(employee);
            }
            else
            {
                await _employeeRepository.AddEmployeeAsync(employee);
            }
            await _employeeRepository.SaveChangesAsync();
        }

        public async Task UpdateEmployeeAsync(EmployeeDto employeeDto)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(employeeDto.Id);
            if (employee is not null)
            {
                employee = employeeDto.MapToEmployee(employee);
                if (!string.IsNullOrEmpty(employeeDto.Cafe) && employeeDto.Cafe != employee.Cafe?.Name)
                {
                    var cafe = await _cafeRepository.GetCafeByNameAsync(employeeDto.Cafe);
                    if (cafe is not null)
                    {
                        employee.StartDate = DateTime.UtcNow;
                        employee.Cafe = cafe;
                    }
                }
                _employeeRepository.UpdateEmployee(employee);
                await _employeeRepository.SaveChangesAsync();
            }
        }

        public async Task DeleteEmployeeAsync(string employeeId)
        {
            _employeeRepository.DeleteEmployee(new Employee { Id = employeeId });
            await _employeeRepository.SaveChangesAsync();
        }

        private string GenerateEmployeeId()
        {
            var stringlen = 7;
            var randValue = 0;
            var str = "";
            string letter;
            for (var i = 0; i < stringlen; i++)
            {
                randValue = _rand.Next(-9, 27);
                letter = randValue < 1 ? Math.Abs(randValue).ToString() : Convert.ToChar(randValue + 64).ToString();
                str += letter;
            }

            return "UI" + str;
        }
    }
}
