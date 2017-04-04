using System;

namespace TurnerStarterKit.Core.Features.Common
{
    public static class ResultsPagingUtility
    {
        private const string ValueLessThanOneErrorMessage = "Value may not be less than 1.";
        private const string ValueLessThanZeroErrorMessage = "Value may not be less than 0.";

        public static int CalculateStartIndex(int pageNumber, int pageSize)
        {
            if (pageNumber < 1)
                throw new ArgumentOutOfRangeException(nameof(pageNumber), pageNumber, ValueLessThanOneErrorMessage);

            if (pageSize < 1)
                throw new ArgumentOutOfRangeException(nameof(pageNumber), pageNumber, ValueLessThanOneErrorMessage);

            var startIndex = (pageNumber - 1) * pageSize;
            return startIndex;
        }

        public static int CalculatePageCount(int totalItemCount, int pageSize)
        {
            if (totalItemCount < 0)
                throw new ArgumentOutOfRangeException(nameof(totalItemCount), totalItemCount, ValueLessThanZeroErrorMessage);

            if (pageSize < 1)
                throw new ArgumentOutOfRangeException(nameof(pageSize), totalItemCount, ValueLessThanOneErrorMessage);

            var totalPageCount = (totalItemCount + pageSize - 1) / pageSize;
            return totalPageCount;
        }
    }
}