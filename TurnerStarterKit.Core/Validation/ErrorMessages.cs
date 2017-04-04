namespace TurnerStarterKit.Core.Validation
{
    public class ErrorMessages
    {
        public class Users
        {
            public const string InvalidClaimsFound = "Invalid claims were found in this operation.";
            public const string DuplicateClaimsFound = "Duplicate claims were found in this operation.";
            public const string InvalidUsername = "The username is invalid.";
            public const string UsernameAlreadyExists = "The username already exists";
            public const string UserMustExist = "The user being referenced does not exist.";
        }
    }
}