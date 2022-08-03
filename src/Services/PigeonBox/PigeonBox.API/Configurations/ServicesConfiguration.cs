using MediatR;
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
            services.AddScoped<IMediatorHandler, MediatorHandler>();

            services.AddDbContext<PigeonBoxContext>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IChatRepository, ChatRepository>();
            services.AddScoped<IUserQueries, UserQueries>();

            services.AddSignalR();
            services.AddMediatR(Assembly.Load("PigeonBox.Application"));
        }
    }
}
