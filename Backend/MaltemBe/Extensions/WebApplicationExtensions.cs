using MaltemBe.Models;
using MaltemBe.Repositories;
using MaltemBe.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MaltemBe.Extensions
{
    public static class WebApplicationExtensions
    {
        public static async Task SeedDataAsync(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<CafeDbContext>();
            var employeeService = scope.ServiceProvider.GetRequiredService<IEmployeeService>();
            await db.Database.MigrateAsync();
            var cafesCount = await db.Cafes.CountAsync();
            if (cafesCount == 0)
            {
                var starbucks = new Cafe
                {
                    Name = "Starbucks",
                    Description = "Starbucks Coffee",
                    Location = "US",
                    Logo = []
                };
                starbucks.AddEmployee(
                    new Employee
                    {
                        Id = employeeService.GenerateEmployeeId(),
                        Name = "John Witch",
                        Email_address = "johnwitch@gmail.com",
                        Phone_number = 88888888,
                        Gender = Gender.Male
                    },
                    DateTime.UtcNow.AddDays(-2));
                starbucks.AddEmployee(
                    new Employee
                    {
                        Id = employeeService.GenerateEmployeeId(),
                        Name = "Kati Witch",
                        Email_address = "katiwitch@gmail.com",
                        Phone_number = 99999999,
                        Gender = Gender.Female
                    },
                    DateTime.UtcNow.AddDays(-1));
                var localCafe = new Cafe
                {
                    Name = "Local cafe",
                    Description = "Local cafe",
                    Location = "UK",
                    Logo = []
                };
                await db.Cafes.AddAsync(starbucks);
                await db.Cafes.AddAsync(localCafe);
                await db.SaveChangesAsync();
            }
        }
    }
}
