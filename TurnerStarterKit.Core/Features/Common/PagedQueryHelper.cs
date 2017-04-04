using AutoMapper.QueryableExtensions;
using System;
using System.Linq;
using TurnerStarterKit.Core.Dtos;

namespace TurnerStarterKit.Core.Features.Common
{
    public class PagedQueryHelper<TEntity, TDto>
    {
        public static Response<PagedResponse<TDto>> GetPagedResponse(IQueryable<TEntity> queryable, PagedRequest request)
        {
            var totalItemCount = queryable.Count();

            var pageCount = ResultsPagingUtility.CalculatePageCount(totalItemCount, request.PageSize);
            var pageNumber = Math.Max(1, Math.Min(request.PageNumber, pageCount));
            var startIndex = ResultsPagingUtility.CalculateStartIndex(pageNumber, request.PageSize);

            var itemDtos = queryable
                .Skip(startIndex)
                .Take(request.PageSize)
                .ProjectTo<TDto>()
                .ToList();

            return new Response<PagedResponse<TDto>>
            {
                Result = new PagedResponse<TDto>()
                {
                    Items = itemDtos,
                    PageCount = pageCount,
                    PageNumber = request.PageNumber,
                    PageSize = request.PageSize,
                    TotalItemCount = totalItemCount,
                }
            };
        }
    }
}
