using Exceptionless;

namespace TurnerStarterKit.Core.Logging
{
    public class ExceptionlessLoggerAdapter : ILogger
    {
        public void Info(string log, params object[] data)
        {
            var exceptionlessBuilder = ExceptionlessClient.Default.CreateLog(log);

            foreach (var @object in data)
            {
                exceptionlessBuilder.AddObject(@object);
            }

            exceptionlessBuilder.Submit();
        }
    }
}