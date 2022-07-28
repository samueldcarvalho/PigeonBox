using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using PigeonBox.Domain.Users.Services;
using PigeonBox.Infrastructure.DataContexts;

namespace PigeonBox.API.Configurations
{
    public static class ApiConfiguration
    {
        public static void AddApiConfiguration(this IServiceCollection services)
        {
            services.AddCors(c =>
            {
                c.AddPolicy("AllowAllOrigins", options =>
                {
                    options.AllowAnyHeader();
                    options.AllowAnyMethod();
                    options.WithOrigins("http://localhost:3000", "http://localhost:8080");
                    options.AllowCredentials();
                });
            });

            services.AddControllers();
            services.AddAuthentication("Authentication")
                .AddScheme<AuthenticationSchemeOptions, AuthenticationHandler>("Authentication", null);

        }
    }
}