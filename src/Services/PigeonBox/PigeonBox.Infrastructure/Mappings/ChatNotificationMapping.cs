using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PigeonBox.Domain.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PigeonBox.Infrastructure.Mappings
{
    public class ChatNotificationMapping : IEntityTypeConfiguration<ChatNotification>
    {
        public void Configure(EntityTypeBuilder<ChatNotification> builder)
        {
            builder.ToTable("chat_notification");
        }
    }
}
