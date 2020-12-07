using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Core;

namespace RestAPI.ServiceExtensions
{
    public static class SerilogServiceExtension
    {
        public static void AddSerilogLogging(this IServiceCollection services)
        {
            services.AddScoped(provider =>
            {

                var logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.File(
                    path: "Logs/log_.txt",
                    rollingInterval: RollingInterval.Day,
                    shared: true
                )
                .CreateLogger();
                Log.Logger = logger;
                return logger;
            });
        }
    }
}
