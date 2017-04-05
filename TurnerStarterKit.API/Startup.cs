using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TurnerStarterKit.Api.Configuration;
using TurnerStarterKit.Core.Configuration;
using TurnerStarterKit.Core.Data;

namespace TurnerStarterKit.Api
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            SimpleInjectorConfig.ConfigureServices(services, Configuration);
            CorsConfig.ConfigureServices(services);
            MvcConfig.ConfigureServices(services);
            SwaggerConfig.ConfigureServices(services);
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DataContext")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            DatabaseMigrator.Migrate(app);
            CorsConfig.Configure(app, env);
            ExceptionlessConfig.Configure(app);
            MvcConfig.Configure(app, env);
            AutoMapperConfig.Configure();
            SwaggerConfig.Configure(app, env);
        }
    }
}
