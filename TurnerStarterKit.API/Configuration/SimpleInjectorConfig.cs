using System;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleInjector;
using SimpleInjector.Integration.AspNetCore.Mvc;
using SimpleInjector.Lifestyles;
using TurnerStarterKit.Api.Controllers;
using TurnerStarterKit.Core.Configuration;
using TurnerStarterKit.Core.Domain;
using TurnerStarterKit.Core.Mediator;

namespace TurnerStarterKit.Api.Configuration
{
    public static class SimpleInjectorConfig
    {
        public static void ConfigureServices(IServiceCollection services, IConfigurationRoot configuration)
        {
            var container = new Container();

            container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
            container.ConfigureCore(configuration, typeof(CommonSettings).GetTypeInfo().Assembly);

            container.RegisterInitializer<BaseApiController>(controller =>
            {
                controller.Mediator = container.GetInstance<IMediator>();
            });

            container.Verify();

            services.AddSingleton(container);
            services.AddSingleton<IControllerActivator>(new SimpleInjectorControllerActivator(container));
            services.UseSimpleInjectorAspNetRequestScoping(container);
        }
    }
}