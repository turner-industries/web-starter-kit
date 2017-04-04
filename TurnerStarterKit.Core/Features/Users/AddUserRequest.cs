using System;
using System.Linq;
using AutoMapper;
using FluentValidation;
using TurnerStarterKit.Core.Data;
using TurnerStarterKit.Core.Domain;
using TurnerStarterKit.Core.Dtos;
using TurnerStarterKit.Core.Mediator;
using TurnerStarterKit.Core.Validation;

namespace TurnerStarterKit.Core.Features.Users
{
    public class AddUserRequestHandler : IRequestHandler<AddUserRequest, AddUserResponse>
    {
        private readonly DataContext _context;

        public AddUserRequestHandler(DataContext context)
        {
            _context = context;
        }

        public Response<AddUserResponse> Handle(AddUserRequest request)
        {
            var newUser = _context.Set<User>().Add(Mapper.Map<User>(request));
            _context.SaveChanges();

            return new Response<AddUserResponse>()
            {
                Result = new AddUserResponse()
                {
                    Id = newUser.Entity.Id
                }
            };
        }
    }

    public class AddUserRequest : UserDto, IRequest<AddUserResponse>
    {
    }

    public class AddUserResponse 
    {
        public int Id { get; set; }
    }

    public class AddUserValidator : AbstractValidator<AddUserRequest>
    {
        private readonly DataContext _context;

        public AddUserValidator(DataContext context)
        {
            _context = context;

            Include(new BaseUserValidator(context));

            RuleFor(x => x)
                .Cascade(CascadeMode.StopOnFirstFailure)
                .NotEmpty()
                .WithMessage(ErrorMessages.Users.InvalidUsername)
                .Must(BeUnique)
                .WithName("Username")
                .WithMessage(ErrorMessages.Users.UsernameAlreadyExists);
        }

        private bool BeUnique(AddUserRequest request)
        {
            return !_context.Set<User>().Any(x => x.UserName == request.UserName);
        }
    }
}
