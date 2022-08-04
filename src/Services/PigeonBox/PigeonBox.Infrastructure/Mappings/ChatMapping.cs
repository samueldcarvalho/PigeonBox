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

            builder.Property(p => p.Description)
                .HasColumnType("BLOB");

            builder.HasMany(p => p.Messages)
                .WithOne(p => p.Chat)
                .HasForeignKey(p => p.ChatId);

            builder.HasMany(p => p.ChatNotifications)
                .WithOne(p => p.Chat)
                .HasForeignKey(p => p.ChatId);

            builder.HasOne(p => p.CreatorUser)
                .WithMany();

            builder.HasIndex(p => p.UniqueIdentifier)
                .IsUnique();

            var chat = new Chat(Guid.NewGuid(), "#Everyone", 1);
            chat.ChangeDescription("Welcome to Pigeonbox! This one a global chat, for every Pigeon in this box. Be respectful! Att.. Samuel =) ");
            chat.Id = 1;

            builder.HasData(chat);
        }
    }
}
