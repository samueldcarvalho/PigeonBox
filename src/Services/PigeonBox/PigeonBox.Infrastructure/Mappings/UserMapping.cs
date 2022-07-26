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
            builder.ToTable("user");

            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Email)
                .IsUnique()
                .HasDatabaseName("ix_Unique_Email");

            builder.HasIndex(x => x.Username)
                .IsUnique()
                .HasDatabaseName("ix_Unique_Username");

            var user = new User("Administrador", "admin@admin.com.br", "admin", "@Asd123456789");
            user.Id = 1;

            builder.HasData(user);
        }
    }
}
