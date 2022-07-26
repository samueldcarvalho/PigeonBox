using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PigeonBox.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Infrastructure.Mappings
{
    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x=> x.Id);

            builder.ToTable("user");

            builder.Property(x => x.Username)
                .HasColumnType("VARCHAR")
                .HasMaxLength(30);

            builder.Property(x => x.Password)
                .HasColumnType("VARCHAR")
                .HasMaxLength(30);

            builder.Property(x => x.Email)
                .HasColumnType("VARCHAR");
        }
    }
}
