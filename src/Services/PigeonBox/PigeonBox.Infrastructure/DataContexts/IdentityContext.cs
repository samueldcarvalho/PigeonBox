using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PigeonBox.Infrastructure.Extensions;
using System;
using System.Reflection;

namespace PigeonBox.Infrastructure.DataContexts
{
    public class IdentityContext : IdentityDbContext
    {
        private readonly DbContextOptions _options;
        private readonly string _connectionString;

        public IdentityContext(DbContextOptions options, IConfiguration configuration) : base(options)
        {
            _options = options;
            _connectionString = configuration.GetConnectionString("DefaultConnection");

            if (string.IsNullOrWhiteSpace(_connectionString))
                throw new Exception("DefaultConnectionString não foi passada nas variáveis de ambiente.");
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
    }
}
