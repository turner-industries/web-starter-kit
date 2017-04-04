namespace TurnerStarterKit.Core.Features.Users
{
    public static class Identity
    {
        public static string[] Claims =
        {
            Constants.Claims.AddUsers,
            Constants.Claims.EditUsers,
            Constants.Claims.ViewUsers
        };
    }
}