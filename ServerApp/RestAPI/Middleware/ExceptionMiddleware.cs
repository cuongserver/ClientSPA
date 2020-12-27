using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Serilog;
using System;
using System.Net.Mime;
using System.Threading.Tasks;

namespace RestAPI.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext context, IWebHostEnvironment env)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                var error = new
                {
                    error = ex.Message,
                    stackTrace = ex.StackTrace
                };

                Log.Error(JsonConvert.SerializeObject(error));
                string result = JsonConvert.SerializeObject(new { error = ex.Message });
                if (env.IsDevelopment())
                {
                    result = JsonConvert.SerializeObject(error);

                }
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = MediaTypeNames.Application.Json;
                await context.Response.WriteAsync(result);
            }
        }
    }
}
