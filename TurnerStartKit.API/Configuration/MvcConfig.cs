using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using TurnerStarterKit.Api.Filters;

namespace TurnerStarterKit.Api.Configuration
{
    public static class MvcConfig
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc(options =>
                {
                    options.Filters.Add(typeof(JsonExceptionFilter));
                })
                .AddJsonOptions(options => options.SerializerSettings.Formatting = Formatting.Indented);
        }

        public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseMvc();
        }
    }
}