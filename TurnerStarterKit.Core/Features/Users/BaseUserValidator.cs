using System.Collections.Generic;
using System.Linq;
using FluentValidation;
using TurnerStarterKit.Core.Data;
using TurnerStarterKit.Core.Extensions;
using TurnerStarterKit.Core.Validation;

namespace TurnerStarterKit.Core.Features.Users
{
    public class BaseUserValidator : AbstractValidator<UserDto>
    {
        private readonly DataContext _context;

        public BaseUserValidator(DataContext context)
        {
            _context = context;

            RuleFor(x => x.UserName)
                .NotEmpty()
                .Length(1, 50);

            RuleFor(x => x.FirstName)
                .NotEmpty()
                .Length(1, 50);

            RuleFor(x => x.LastName)
                .NotEmpty()
                .Length(1, 50);

            RuleFor(user => user.Claims)
                .Must(NotContainInvalidClaims)
                .WithMessage(ErrorMessages.Users.InvalidClaimsFound);

            RuleFor(user => user.Claims)
                .Must(NotIncludeDuplicateClaims)
                .WithMessage(ErrorMessages.Users.DuplicateClaimsFound);
        }

        private bool NotContainInvalidClaims(IList<UserClaimDto> claims)
        {
            return claims.All(claim => Identity.Claims.Contains(claim.Name));
        }

        private bool NotIncludeDuplicateClaims(IList<UserClaimDto> claims)
        {
            return !claims.HasDuplicates(x => x.Name);
        }
    }
}