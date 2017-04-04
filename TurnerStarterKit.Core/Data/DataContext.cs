using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TurnerStarterKit.Core.Domain;
using TurnerStarterKit.Core.Extensions;

namespace TurnerStarterKit.Core.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>();
            modelBuilder.Entity<UserClaim>();

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            base.OnModelCreating(modelBuilder);
        }

        public void Update<TEntity>(TEntity entity, 
            IEnumerable<Expression<Func<TEntity, object>>> expressions) where TEntity : class, IEntity
        {
            var entry = Entry(entity);

            if (entry.State == EntityState.Detached)
            {
                Set<TEntity>().Attach(entity);
            }

            entry.SetModified(expressions);
        }
    }
}