using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PigeonBox.Core.Infrastructure.Database;
using PigeonBox.Domain.Chats;
using PigeonBox.Domain.Messages;
using PigeonBox.Domain.Notifications;
using PigeonBox.Domain.Users;
using PigeonBox.Infrastructure.Extensions;
using System;
using System.Reflection;
using System.Threading.Tasks;

namespace PigeonBox.Infrastructure.DataContexts
{
    public class PigeonBoxContext : DbContext, IUnitOfWork
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<ChatNotification> Notifications { get; set; }

        private readonly string _connectionString;

        public PigeonBoxContext(DbContextOptions<PigeonBoxContext> options, IConfiguration configuration) : base(options) 
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrWhiteSpace(_connectionString))
                throw new Exception("ConnectionString não foi declarada nas variáveis de ambiente");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasCharSet("latin1", false);
            modelBuilder.SetDefaultLengths();
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseMySql(_connectionString, ServerVersion.Parse("8.0"))
                .UseSnakeCaseNamingConvention();

            base.OnConfiguring(optionsBuilder);
        }

        public Task Commit()
        {
            if (!ChangeTracker.HasChanges())
                return Task.CompletedTask;

            return SaveChangesAsync();
        }
    }
}
