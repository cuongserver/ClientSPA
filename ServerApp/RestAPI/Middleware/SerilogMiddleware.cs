using Microsoft.AspNetCore.Http;
using Serilog;
using Serilog.Context;
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
        public async Task Invoke(HttpContext context)
        {
            using (LogContext.PushProperty("RequestTraceId", context.TraceIdentifier))
            {
                Log.Information("Start request");
                await _next(context);
                Log.Information("Finished");
            }

        }
    }
}
