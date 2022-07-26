using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using PigeonBox.Infrastructure.DataContexts;

namespace PigeonBox.API.Configurations
{
    public static class ServicesConfiguration
    {
        public static void AddDependencyInjection(this IServiceCollection services)
        {
            services.AddDbContext<PigeonBoxContext>();
        }
    }
}
