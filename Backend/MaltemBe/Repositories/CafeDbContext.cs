using MaltemBe.Models;
using Microsoft.EntityFrameworkCore;

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
            modelBuilder.Entity<Cafe>()
                .HasMany(e => e.Employees)
                .WithOne(e => e.Cafe)
                .IsRequired(false);
        }
    }
}
