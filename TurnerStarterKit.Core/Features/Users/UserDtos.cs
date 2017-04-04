using System.Collections.Generic;

namespace TurnerStarterKit.Core.Features.Users
{
    public class UserDto
    {
        public UserDto()
        {
            Claims = new List<UserClaimDto>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public bool Active { get; set; }

        public IList<UserClaimDto> Claims { get; set; }
    }

    public class GetUserDto : UserDto
    {
        public int Id { get; set; }
    }

    public class UserClaimDto
    {
        public string Name { get; set; }

        public string Value { get; set; }
    }
}