using Exceptionless.Json;

namespace TurnerStarterKit.Core.Logging
{
    public class DebugLogger : ILogger
    {
        public void Info(string log, params object[] data)
        {
            System.Diagnostics.Debug.WriteLine(log);

            foreach (var @object in data)
            {
                System.Diagnostics.Debug.WriteLine(JsonConvert.SerializeObject(@object, Formatting.Indented));
            }
        }
    }
}