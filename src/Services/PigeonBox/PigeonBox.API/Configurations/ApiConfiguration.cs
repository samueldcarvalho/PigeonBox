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
                    options.WithOrigins("http://localhost:3000", "http://localhost:8080", "https://4e16-2804-1b3-6f00-5364-1549-1a0-f10b-c4b7.sa.ngrok.io");
                    options.AllowCredentials();
                });
            });

            services.AddControllers();
            services.AddAuthentication("Authentication")
                .AddScheme<AuthenticationSchemeOptions, Domain.Users.Services.AuthenticationService>("Authentication", null);

        }
    }
}