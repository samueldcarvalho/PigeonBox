using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PigeonBox.Domain.Chats;
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
                .IsUnique();

            builder.HasIndex(x => x.Username)
                .IsUnique();

            builder.HasMany(p => p.Chats)
                .WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>("join_chats_users",
                    j => j.HasOne<Chat>().WithMany().HasForeignKey("ChatId"),
                    j => j.HasOne<User>().WithMany().HasForeignKey("UserId"));

            var user = new User("Administrador", "admin@admin.com.br", "admin", "@Asd123456789");
            user.Id = 1;

            builder.HasData(user);
        }
    }
}
