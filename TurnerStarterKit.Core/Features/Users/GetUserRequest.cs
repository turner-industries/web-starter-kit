using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using FluentValidation;
using TurnerStarterKit.Core.Domain;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Features.Common;
using TurnerStarterKit.Core.Mediator;

namespace TurnerStarterKit.Core.Features.Users
{
    public class GetUserRequestHandler : IRequestHandler<GetUserRequest, GetUserDto>
    {
        private readonly EntityByIdQueryHandler<User, GetUserDto> _getUserByIdQuery;

        public GetUserRequestHandler(EntityByIdQueryHandler<User, GetUserDto> getUserByIdQuery)
        {
            _getUserByIdQuery = getUserByIdQuery;
        }

        public Response<GetUserDto> Handle(GetUserRequest request)
        {
            _getUserByIdQuery.Includes = new List<Expression<Func<User, object>>>()
            {
                 x => x.Claims
            };

            var queryResponse = _getUserByIdQuery.Handle(request.Id);

            var response = new Response<GetUserDto>();

            if (queryResponse.HasErrors)
            {
                response.Errors.AddRange(queryResponse.Errors);
                return response;
            }

            response.Result = queryResponse.Result;
            return response;
        }
    }

    public class GetUserRequest : IRequest<GetUserDto>
    {
        public int Id { get; set; }

        public GetUserRequest(int id)
        {
            Id = id;
        }
    }

    public class GetUserValidator : AbstractValidator<GetUserRequest>
    {
        public GetUserValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
        }
    }
}
