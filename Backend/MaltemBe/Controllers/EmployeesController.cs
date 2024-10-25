using MaltemBe.Dtos;
using MaltemBe.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MaltemBe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly ICafeService _cafeService;
        private readonly IEmployeeService _employeeService;

        public EmployeesController(ICafeService cafeService, IEmployeeService employeeService)
        {
            _cafeService = cafeService;
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<List<EmployeeDto>> GetEmployeesByCafeName([FromQuery(Name = "cafe")] string? cafeName)
        {
            return await _employeeService.GetEmployeesByCafeNameAsync(cafeName);
        }

        [HttpPost]
        public async Task CreateEmployee([FromBody] EmployeeDto employeeDto)
        {
            await _employeeService.CreateEmployeeAsync(employeeDto);
        }

        [HttpPut]
        public async Task UpdateEmployee([FromBody] EmployeeDto employeeDto)
        {
            await _employeeService.UpdateEmployeeAsync(employeeDto);
        }

        [HttpDelete]
        public async Task DeleteEmployee([FromQuery] string id)
        {
            await _employeeService.DeleteEmployeeAsync(id);
        }
    }
}
