using System;
using System.Collections.Generic;
using System.Linq;

namespace TurnerStarterKit.Core.Extensions
{
    // ReSharper disable once InconsistentNaming
    public static class ICollectionExtensions
    {
        public static List<TTKey> Duplicates<T, TTKey>(this ICollection<T> collection,
            Func<T, TTKey> groupByClause)
        {
            return collection.GroupBy(groupByClause)
                .Where(group => group.Count() > 1)
                .Select(group => group.Key)
                .ToList();
        }

        public static bool HasDuplicates<T, TTKey>(this ICollection<T> collection,
            Func<T, TTKey> groupByClause)
        {
            return collection.Duplicates(groupByClause).Any();
        }
    }
}