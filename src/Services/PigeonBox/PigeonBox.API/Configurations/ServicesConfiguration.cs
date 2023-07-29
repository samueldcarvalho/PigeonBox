using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using PigeonBox.Application.Interfaces;
using PigeonBox.Application.Queries;
using PigeonBox.Core.CQRS;
using PigeonBox.Domain.Interfaces;
using PigeonBox.Infrastructure.DataContexts;
using PigeonBox.Infrastructure.Repositories;
using System.Reflection;

namespace PigeonBox.API.Configurations
{
    public static class ServicesConfiguration
    {
        public static void AddServicesConfiguration(this IServiceCollection services)
        {
            services.AddSignalR();

            services.AddDbContext<PigeonBoxContext>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IChatRepository, ChatRepository>();
            services.AddScoped<IUserQueries, UserQueries>();
            services.AddScoped<IChatQueries, ChatQueries>();
            services.AddHttpContextAccessor();

            services.AddScoped<IMediatorHandler, MediatorHandler>();
            services.AddMediatR(config =>
                config.RegisterServicesFromAssemblies(Assembly.Load("PigeonBox.Application")));
        }
    }
}
