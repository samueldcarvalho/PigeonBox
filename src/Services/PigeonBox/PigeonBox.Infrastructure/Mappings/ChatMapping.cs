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
    public class ChatMapping : IEntityTypeConfiguration<Chat>
    {
        public void Configure(EntityTypeBuilder<Chat> builder)
        {
            builder.ToTable("chat");

            builder.HasMany(p => p.Messages)
                .WithOne(p => p.Chat)
                .HasForeignKey();

            builder.HasMany(p => p.ChatNotifications)
                .WithOne(p => p.Chat)
                .HasForeignKey();
        }
    }
}
