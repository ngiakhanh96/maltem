using FluentValidation;
using FluentValidation.AspNetCore;
using MaltemBe.Converters;
using MaltemBe.Models;
using MaltemBe.Repositories;
using MaltemBe.Repositories.Interfaces;
using MaltemBe.Services;
using MaltemBe.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CafeDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ICafeService, CafeService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<ICafeRepository, CafeRepository>();
builder.Services.AddScoped<ICafeService, CafeService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonToByteArrayConverter());
}); ;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();
