using Microsoft.Extensions.DependencyInjection;

namespace PigeonBox.API.Configurations
{
    public static class ApiConfiguration
    {
        public static void AddApiConfiguration(this IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder => builder
                    .WithOrigins("http://localhost:8080")
                    .AllowAnyHeader()
                    .AllowAnyMethod().
                    AllowCredentials());
            });
        }
    }
}