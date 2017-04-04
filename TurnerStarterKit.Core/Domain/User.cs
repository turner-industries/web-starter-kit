using System;
using System.Collections.Generic;
using TurnerStarterKit.Core.Data;

namespace TurnerStarterKit.Core.Domain
{
    public class User : Entity
    {
        public User()
        {
            Claims = new List<UserClaim>();
        }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public bool Active { get; set; }

        public IList<UserClaim> Claims { get; set; }
    }

    public class UserClaim : Entity
    {
        public string Name { get; set; }

        public string Value { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}