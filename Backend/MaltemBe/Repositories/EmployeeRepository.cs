using MaltemBe.Models;
using MaltemBe.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MaltemBe.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly CafeDbContext _dbContext;

        public EmployeeRepository(CafeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            return await _dbContext.Employees.Include(e => e.Cafe).ToListAsync();
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            await _dbContext.Employees.AddAsync(employee);
            return employee;
        }

        public void DeleteEmployee(Employee employee)
        {
            _dbContext.Remove(employee);
        }

        public void UpdateEmployee(Employee employee)
        {
            _dbContext.Update(employee);
        }

        public async Task<Employee?> GetEmployeeByIdAsync(string? id)
        {
            return await _dbContext.Employees.FirstOrDefaultAsync(p => p.Id == (id ?? string.Empty));
        }

        public async Task SaveChangesAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
