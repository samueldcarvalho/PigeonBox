using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace PigeonBox.API.Configurations
{
    public static class SwaggerConfiguration
    {

        public static void AddSwaggerConfiguration(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PigeonBox.API", Version = "v1" });
            });
        }
    }
}