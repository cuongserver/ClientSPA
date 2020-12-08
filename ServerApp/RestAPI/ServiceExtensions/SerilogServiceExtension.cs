using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;

namespace RestAPI.ServiceExtensions
{
    public static class SerilogServiceExtension
    {
        public static void AddSerilogLogging(this IServiceCollection services)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.File(
                    path: "Logs/log_.txt",
                    rollingInterval: RollingInterval.Day,
                    shared: true
                )
                .CreateLogger();
            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.ClearProviders();
                loggingBuilder.AddSerilog(dispose: true);
            });
        }
    }
}
