using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
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
        public static void AddDependencyInjection(this IServiceCollection services)
        {
            services.AddDbContext<PigeonBoxContext>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserQuery, UserQuery>();

            services.AddSignalR();
            services.AddMediatR(Assembly.Load("PiegonBox.Application"));
            services.AddScoped<IMediatorHandler, MediatorHandler>();
        }
    }
}
