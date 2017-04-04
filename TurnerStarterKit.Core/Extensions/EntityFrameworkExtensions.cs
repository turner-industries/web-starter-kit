using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace TurnerStarterKit.Core.Extensions
{
    public static class EntityFrameworkExtensions
    {
        public static void SetModified<TEntity>(
            this EntityEntry<TEntity> entry,
            IEnumerable<Expression<Func<TEntity, object>>> expressions) where TEntity : class
        {
            foreach (var expression in expressions)
                entry.Property(expression).IsModified = true;
        }

        public static void SetUnModified<TEntity>(
            this EntityEntry<TEntity> entry,
            IEnumerable<Expression<Func<TEntity, object>>> expressions) where TEntity : class
        {
            foreach (var expression in expressions)
                entry.Property(expression).IsModified = false;
        }
    }
}