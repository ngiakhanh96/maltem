using MaltemBe.Models;

namespace MaltemBe.Repositories.Interfaces
{
    public interface IEmployeeRepository
    {
        public Task<Employee> AddEmployeeAsync(Employee employee);
        public Task<List<Employee>> GetAllEmployees();
        public void DeleteEmployee(Employee employee);
        public void UpdateEmployee(Employee employee);
        public Task<Employee?> GetEmployeeByIdAsync(string? id);
        public Task SaveChangesAsync();
    }
}
