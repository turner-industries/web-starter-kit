namespace TurnerStarterKit.Core.Logging
{
    public interface ILogger
    {
        void Info(string log, params object[] data);
    }
}