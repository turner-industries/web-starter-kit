using TurnerStarterKit.Core.Validation;

namespace TurnerStarterKit.Core.Dtos
{
    public static class IRequestExtensions
    {
        public static Response<T> AsResponse<T>(this T item)
        {
            return new Response<T> { Result = item };
        }

        public static Response HasError(this IRequest item, string errorMessage, string property = "")
        {
            return AddResultError<object>(errorMessage, property);
        }

        public static Response<T> HasError<T>(this IRequest<T> item, string errorMessage, string property = "")
        {
            return AddResultError<T>(errorMessage, property);
        }

        private static Response<T> AddResultError<T>(string errorMessage, string property)
        {
            var result = new Response<T>();
            result.Errors.Add(new Error
            {
                PropertyName = property,
                ErrorMessage = errorMessage
            });

            return result;
        }
    }
}