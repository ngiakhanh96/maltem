using MaltemBe.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MaltemBe.EntityConfigurations
{
    public class CafeEntityConfiguration : IEntityTypeConfiguration<Cafe>
    {
        public void Configure(EntityTypeBuilder<Cafe> builder)
        {
            builder.HasKey(p => p.Id);
            builder
                .HasMany(e => e.Employees)
                .WithOne(e => e.Cafe)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(p => p.Name).HasMaxLength(10);
            builder.Property(p => p.Description).HasMaxLength(256);
        }
    }
}
