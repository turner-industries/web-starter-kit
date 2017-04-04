using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TurnerStarterKit.Core.Data;

namespace TurnerStarterKit.Core.Configuration
{
    public class DatabaseMigrator
    {
        public static void Migrate(IApplicationBuilder app)
        {
            var dataContext = app.ApplicationServices.GetService<DataContext>();
            dataContext.Database.Migrate();
        }
    }
}
