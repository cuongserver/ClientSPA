using Microsoft.AspNetCore.Http;
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
        public async Task Invoke(HttpContext context, Logger logger)
        {
            logger.Information("Start request");
            await _next(context);
            logger.Information("Finished");
        }
    }
}
