using DemoCms.EF;
using DemoCms.EF.MsSqlServer;
using DemoCms.Helper;
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
			JsonConvert.DefaultSettings = () => new JsonSerializerSettings
			{
				Formatting = Formatting.None,
				ContractResolver = new CamelCasePropertyNamesContractResolver()
			};

			services.AddControllers();
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
				.WithOrigins("http://localhost:3000")
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials()
				.WithExposedHeaders("set-cookie")
				.SetIsOriginAllowed(origin => origin == "http://localhost:3000");
			});

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
