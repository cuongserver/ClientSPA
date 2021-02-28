using DemoCms.EF;
using DemoCms.EF.MsSqlServer;
using DemoCms.Helper;
using DemoCms.RestAPI.Caching;
using DemoCms.RestAPI.Middlewares;
using DemoCms.RestAPI.ModelValidators;
using DemoCms.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DemoCms.RestAPI
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
			services.AddControllers().AddNewtonsoftJson(options => 
			{
				options.SerializerSettings.Formatting = Formatting.None;
				options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
			});
			services.AddDemoCmsEF<MsSqlServerDb>(options =>
			{
				options.UseSqlServer(Configuration.GetValue<string>("SqlServerDbConnection:Default"));
			});
			services.AddRepository();
			services.AddServices();
			services.AddHelpers();

			// Register the Swagger generator, defining 1 or more Swagger documents
			services.AddSwaggerGen();
			services.AddCors();
			services.ApplyFluentValidation();
			services.AddSingleton<PermissionCachingManager>();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			// Enable middleware to serve generated Swagger as a JSON endpoint.
			app.UseSwagger();

			// specifying the Swagger JSON endpoint.
			app.UseSwaggerUI(options =>
			{
				options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
			});
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors(policy =>
			{
				policy
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials()
				.SetIsOriginAllowed(origin => true);
			});

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthentication();
			//after userouting for getendpoint to work
			app.UseMiddleware<JwtValidationMiddleware>();

			app.UseMiddleware<CustomAuthorizeMiddleware>();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
