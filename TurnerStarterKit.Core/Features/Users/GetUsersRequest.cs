using System;
using System.Linq;
using TurnerStarterKit.Core.Data;
using TurnerStarterKit.Core.Domain;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Features.Common;
using TurnerStarterKit.Core.Mediator;
using TurnerStarterKit.Core.Decorators;

namespace TurnerStarterKit.Core.Features.Users
{
    [DoNotValidate]
    public class GetUsersRequestHandler : IRequestHandler<GetUsersRequest, PagedResponse<GetUserDto>>
    {
        private readonly DataContext _context;

        public GetUsersRequestHandler(DataContext context)
        {
            _context = context;
        }

        public Response<PagedResponse<GetUserDto>> Handle(GetUsersRequest request)
        {
            var queryable = _context.Set<User>().AsQueryable();

            if (!String.IsNullOrEmpty(request.SearchField))
            {
                queryable = queryable.Where(x =>
                    x.FirstName.StartsWith(request.SearchField) ||
                    x.LastName.StartsWith(request.SearchField) ||
                    x.UserName.StartsWith(request.SearchField));
            }

            return PagedQueryHelper<User, GetUserDto>.GetPagedResponse(queryable, request);
        }
    }

    public class GetUsersRequest : PagedRequest, IRequest<PagedResponse<GetUserDto>>
    {
        public string SearchField { get; set; }
    }
}
