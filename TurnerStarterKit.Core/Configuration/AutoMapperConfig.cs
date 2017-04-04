using System;
using System.Linq;
using System.Reflection;
using AutoMapper;
using TurnerStarterKit.Core.Extensions;

namespace TurnerStarterKit.Core.Configuration
{
    public interface IAutoMapperTypeConfigurator
    {
        void Configure(IMapperConfigurationExpression config);
    }

    public class AutoMapperConfig
    {
        public static void Configure(bool assertConfigurationIsValid = true)
        {
            Mapper.Initialize(config =>
            {
                typeof(IAutoMapperTypeConfigurator).GetTypeInfo().Assembly
                    .GetExportedTypes()
                    .Where(t => !IntrospectionExtensions.GetTypeInfo(t).IsAbstract && typeof(IAutoMapperTypeConfigurator).IsAssignableFrom(t))
                    .ForEach(t =>
                    {
                        var mappingConfigurator = (IAutoMapperTypeConfigurator) Activator.CreateInstance(t);
                        mappingConfigurator.Configure(config);
                    });
            });

            if (assertConfigurationIsValid)
            {
                Mapper.AssertConfigurationIsValid();
            }
        }
    }
}