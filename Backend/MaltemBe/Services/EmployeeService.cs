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

        public EmployeeService(IEmployeeRepository employeeRepository, ICafeRepository cafeRepository)
        {
            _employeeRepository = employeeRepository;
            _cafeRepository = cafeRepository;
        }

        public async Task<List<EmployeeDto>> GetEmployeesByCafeNameAsync(string cafeName)
        {
            var cafe = await _cafeRepository.GetCafeByNameAsync(cafeName);
            return cafe?.Employees.Select(EmployeeDto.MapFromEmployee).ToList() ?? new List<EmployeeDto>();
        }

        public async Task CreateEmployeeAsync(EmployeeDto employeeDto)
        {
            var cafe = await _cafeRepository.GetCafeByNameAsync(employeeDto.Cafe);
            var employee = employeeDto.MapToEmployee();
            if (cafe is not null)
            {
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
    }
}
