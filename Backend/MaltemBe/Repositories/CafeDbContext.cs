using MaltemBe.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace MaltemBe.Repositories
{
    public class CafeDbContext : DbContext
    {
        public DbSet<Cafe> Cafes { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public CafeDbContext(DbContextOptions<CafeDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
