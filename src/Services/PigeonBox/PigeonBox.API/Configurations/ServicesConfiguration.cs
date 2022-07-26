using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace PigeonBox.API.Configurations
{
    public static class ServicesConfiguration
    {
        public static void AddDependencyInjection(this IServiceCollection services)
        {
            //services.AddDbContext();
        }

        public static void AddSwaggerConfiguration(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PigeonBox.API", Version = "v1" });
            });
        }

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
