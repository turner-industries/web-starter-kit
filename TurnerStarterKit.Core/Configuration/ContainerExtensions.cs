using System;
using System.Reflection;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SimpleInjector;
using TurnerStarterKit.Core.Data;
using TurnerStarterKit.Core.Decorators;
using TurnerStarterKit.Core.Extensions;
using TurnerStarterKit.Core.Logging;
using TurnerStarterKit.Core.Mediator;

namespace TurnerStarterKit.Core.Configuration
{
    public static class ContainerExtensions
    {
        public static void ConfigureCore(this Container container, IConfigurationRoot configuration, params Assembly[] mediatorAssemblies)
        {
            container.Register(() =>
            {
                var options = new DbContextOptionsBuilder<DataContext>();
                options.UseSqlServer(configuration.GetConnectionString("DataContext"));
                return new DataContext(options.Options);
            }, Lifestyle.Scoped);

            container.Register(() => new CommonSettings
            {
                Example = configuration["Example"]
            });

            ConfigureLogger(Boolean.Parse(configuration["Logging:UseExceptionless"]), container);

            container.ConfigureMediator(mediatorAssemblies);
        }

        private static void ConfigureMediator(this Container container, params Assembly[] mediatorAssemblies)
        {
            container.Register<IMediator>(() => new Mediator.Mediator(container), Lifestyle.Singleton);

            container.Register(typeof(IRequestHandler<>), mediatorAssemblies);
            container.Register(typeof(IRequestHandler<,>), mediatorAssemblies);

            container.Register(typeof(IValidator<>), mediatorAssemblies);

            container.RegisterDecorator(
                typeof(IRequestHandler<>),
                typeof(ValidationHandler<>),
                Lifestyle.Scoped,
                x => !x.ImplementationType.ContainsAttribute(typeof(DoNotValidate)));

            container.RegisterDecorator(
                typeof(IRequestHandler<,>),
                typeof(ValidationHandler<,>),
                Lifestyle.Scoped,
                x => !x.ImplementationType.ContainsAttribute(typeof(DoNotValidate)));

            container.Register(typeof(BaseValidationHandler<,>), typeof(BaseValidationHandler<,>), Lifestyle.Scoped);

            container.Register(typeof(BaseTransactionHandler<>), typeof(BaseTransactionHandler<>), Lifestyle.Scoped);
            container.RegisterDecorator(typeof(IRequestHandler<>), typeof(TransactionHandler<>), Lifestyle.Scoped);
            container.RegisterDecorator(typeof(IRequestHandler<,>), typeof(TransactionHandler<,>), Lifestyle.Scoped);

            container.RegisterDecorator(
                typeof(IRequestHandler<>),
                typeof(LoggingHandler<>),
                Lifestyle.Scoped,
                x => !x.ImplementationType.ContainsAttribute(typeof(DoNotLog)));

            container.RegisterDecorator(
                typeof(IRequestHandler<,>),
                typeof(LoggingHandler<,>),
                Lifestyle.Scoped,
                x => !x.ImplementationType.ContainsAttribute(typeof(DoNotLog)));
        }

        private static void ConfigureLogger(bool useExceptionless, Container container)
        {
            if (useExceptionless)
            {
                container.Register<ILogger, ExceptionlessLoggerAdapter>(Lifestyle.Singleton);
            }
            else
            {
                container.Register<ILogger, DebugLogger>(Lifestyle.Singleton);
            }
        }
    }
}