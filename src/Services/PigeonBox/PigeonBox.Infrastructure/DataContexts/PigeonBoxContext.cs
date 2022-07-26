using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PigeonBox.Core.Infrastructure.Database;
using System;
using System.Threading.Tasks;

namespace PigeonBox.Infrastructure.DataContexts
{
    public class PigeonBoxContext : DbContext, IUnitOfWork
    {
        private readonly string _connectionString;
        public PigeonBoxContext(DbContextOptions<PigeonBoxContext> options, IConfiguration configuration) : base(options) 
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrWhiteSpace(_connectionString))
                throw new Exception("ConnectionString não foi declarada nas variáveis de ambiente");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(_connectionString, ServerVersion.AutoDetect(_connectionString));
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
