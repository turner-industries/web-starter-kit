using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using FluentValidation;
using TurnerStarterKit.Core.Data;
using TurnerStarterKit.Core.Domain;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Extensions;
using TurnerStarterKit.Core.Mediator;
using TurnerStarterKit.Core.Validation;

namespace TurnerStarterKit.Core.Features.Users
{
    public class EditUserRequestHandler : IRequestHandler<EditUserRequest>
    {
        private readonly DataContext _context;

        public EditUserRequestHandler(DataContext context)
        {
            _context = context;
        }

        private void SynchronizeClaims(GetUserDto request)
        {
            var claims = _context.Set<UserClaim>().Where(x => x.UserId == request.Id).ToList();
            claims.ForEach(x => _context.Set<UserClaim>().Remove(x));

            request.Claims.ForEach(x =>
            {
                var userClaim = Mapper.Instance.Map<UserClaim>(x);
                userClaim.UserId = request.Id;
                _context.Set<UserClaim>().Add(userClaim);
            });
            _context.SaveChanges();
        }

        public Response Handle(EditUserRequest request)
        {
            SynchronizeClaims(request);

            var user = Mapper.Instance.Map<User>(request);
            user.Claims = new List<UserClaim>();

            _context.Update(user,
                new List<Expression<Func<User, object>>>
                {
                    x => x.FirstName,
                    x => x.LastName,
                    x => x.UserName,
                    x => x.Active,
                });

            _context.SaveChanges();

            return new Response();
        }
    }

    public class EditUserRequest : GetUserDto, IRequest
    {
    }

    public class EditUserValidator : AbstractValidator<EditUserRequest>
    {
        private readonly DataContext _context;

        public EditUserValidator(DataContext context)
        {
            _context = context;

            Include(new BaseUserValidator(context));

            RuleFor(user => user.Id)
                .Must(Exist)
                .WithMessage(ErrorMessages.Users.UserMustExist);

            RuleFor(user => user)
                .Must(BeUnique)
                .WithMessage(ErrorMessages.Users.UsernameAlreadyExists)
                .WithName("Username");
        }

        private bool Exist(int id)
        {
            return _context.Set<User>().Any(x => x.Id == id);
        }

        private bool BeUnique(EditUserRequest user)
        {
            return !_context.Set<User>().Any(x => x.UserName == user.UserName && x.Id != user.Id);
        }
    }
}
