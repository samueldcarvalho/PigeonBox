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
                c.AddDefaultPolicy(options => options
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()));

            services.AddControllers();
            services.AddAuthentication("Authentication")
                .AddScheme<AuthenticationSchemeOptions, Domain.Users.Services.AuthenticationService>("Authentication", null);
        }
    }
}