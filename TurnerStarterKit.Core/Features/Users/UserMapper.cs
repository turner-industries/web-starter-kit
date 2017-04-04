using System;
using AutoMapper;
using TurnerStarterKit.Core.Configuration;
using TurnerStarterKit.Core.Domain;

namespace TurnerStarterKit.Core.Features.Users
{
    public class UserMapper : IAutoMapperTypeConfigurator
    {
        public void Configure(IMapperConfigurationExpression config)
        {
            config.CreateMap<AddUserRequest, User>()
                .ForMember(x => x.Id, options => options.Ignore());

            config.CreateMap<EditUserRequest, User>();

            config.CreateMap<User, GetUserDto>();
            config.CreateMap<UserClaim, UserClaimDto>();

            config.CreateMap<UserClaimDto, UserClaim>()
                .ForMember(x => x.Id, options => options.Ignore())
                .ForMember(x => x.User, options => options.Ignore())
                .ForMember(x => x.UserId, options => options.Ignore());
        }
    }
}
