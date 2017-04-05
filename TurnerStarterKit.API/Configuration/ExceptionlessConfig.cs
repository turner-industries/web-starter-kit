using Exceptionless;
using Microsoft.AspNetCore.Builder;

namespace TurnerStarterKit.Api.Configuration
{
    public static class ExceptionlessConfig
    {
        public static void Configure(IApplicationBuilder app)
        {
            app.UseExceptionless("2BCuzUkowXDTR6907Bvsjjnkabthx0rDHoi0KA73");
            ExceptionlessClient.Default.Startup("2BCuzUkowXDTR6907Bvsjjnkabthx0rDHoi0KA73");
        }
    }
}