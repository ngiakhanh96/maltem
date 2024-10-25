using MaltemBe.Dtos;

namespace MaltemBe.Services.Interfaces
{
    public interface IEmployeeService
    {
        public Task<List<EmployeeDto>> GetEmployeesByCafeNameAsync(string? cafeName);

        public Task CreateEmployeeAsync(EmployeeDto employeeDto);

        public Task UpdateEmployeeAsync(EmployeeDto employeeDto);

        public Task DeleteEmployeeAsync(string employeeId);
    }
}
