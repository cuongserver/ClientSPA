using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Filters;

namespace RestAPI.ServiceExtensions
{
    public static class SerilogServiceExtension
    {
        public static void AddSerilogLogging(this IServiceCollection services)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .Filter.ByExcluding(Matching.WithProperty<string>("SourceContext", src =>
                {
                    return src == "Microsoft.AspNetCore.Hosting.Diagnostics";
                }))
                .WriteTo.File(
                    path: "Logs/log_.txt",
                    rollingInterval: RollingInterval.Day,
                    shared: true,
                    outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{SourceContext}:{Level:u3}] [rid: {RequestTraceId}] {Message:lj}{NewLine}{Exception}"
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
