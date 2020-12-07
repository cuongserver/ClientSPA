using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Core;
using System.Threading.Tasks;

namespace RestAPI.Middleware
{
    public class SerilogMiddleware
    {
        private readonly RequestDelegate _next;
        public SerilogMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext context, Logger logger, ILoggerFactory loggerFactory)
        {
            using (logger)
            {
                loggerFactory.AddSerilog(logger);
                logger.Information("Start request");
                await _next(context);
                logger.Information("Finished");
                logger.Dispose();
            }

        }
    }
}
