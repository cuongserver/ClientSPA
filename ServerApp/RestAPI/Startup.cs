using AutoMapper;
using DataAccess.DatabaseContext;
using DataAccess.Repository;
using DataStorage;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RestAPI.Middleware;
using RestAPI.ServiceExtensions;
using Security;
using Serilog;
using Service;
using System;
using System.IO;

namespace RestAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddDbContext<CmsContext>(options => options.UseSqlServer(Configuration.GetValue<string>("DbConnection:Default")));
            services.AddScoped<IUserRepository<User, Guid>, UserRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<SecretEnhancer>();
            services.AddScoped<IJwtTokenHelper, JwtTokenHelper>();
            services.AddAutoMapper(typeof(Startup));

            //avoid the MultiPartBodyLength error
            services.Configure<FormOptions>(options =>
            {
                options.ValueLengthLimit = int.MaxValue;
                options.MultipartBodyLengthLimit = int.MaxValue;
                options.MemoryBufferThreshold = int.MaxValue;
            });

            services.AddSerilogLogging();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env,
            ILoggerFactory loggerFactory
        )
        {
            loggerFactory.AddSerilog(dispose: true);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //serve static file from Resources folder
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseMiddleware<SerilogMiddleware>();

            app.UseCors(policy => policy.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true));

            app.UseMiddleware<JwtMiddleware>();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
