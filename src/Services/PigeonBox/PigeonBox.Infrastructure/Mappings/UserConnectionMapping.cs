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
    public class UserConnectionMapping : IEntityTypeConfiguration<UserConnection>
    {
        public void Configure(EntityTypeBuilder<UserConnection> builder)
        {
            builder.ToTable("user_connection");

            builder.HasOne(p => p.User)
                .WithOne(p => p.UserConnection)
                .HasForeignKey<UserConnection>(p => p.UserId);

            builder.HasIndex(p => p.ConnectionId);
            builder.HasIndex(p => p.IsConnected);

            var userConnection = new UserConnection();
            userConnection.UserId = 1;
            userConnection.Id = 1;

            builder.HasData(userConnection);
        }
    }
}
