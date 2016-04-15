using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using Serilog;
using SoftCode.BookmarkGenerator.Common.Helpers;
using SoftCode.BookmarkGenerator.Common.Repository;
using Softcore.BookmarkGenerator.API.ViewModelHelpers;

namespace SoftCode.BookmarkGenerator.API
{
    public class Startup
    {
        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json");

            if (env.IsEnvironment("Development"))
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build().ReloadOnChanged("appsettings.json");

            // TO-DO, move stuff to appsettings.json
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                //.MinimumLevel.Error()
                //.WriteTo.RollingFile(Path.Combine(appEnv.ApplicationBasePath, "log-{Date}.txt"))
                .CreateLogger();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddMvc();

            // Doc says to add Options service in startup, but it appears to work without
            //services.AddOptions();
            
            // Adding IBookmarkRepository DI
            services.AddScoped<IBookmarkRepository, BookmarkRepository>();
            // Any where that needs configuration
            services.AddSingleton(provider => Configuration);

            
            // Use SqlConnectionStringHelper for this instance
            services.AddSingleton<IConnectionStringHelper, SqlConnectionStringHelper>();
            // Configure the option object used by SqlConnectionStringHelper
            services.Configure<SqlConnectionStringHelperOptions>(options =>
            {
                options.UserName = Configuration["DatabaseAccountInfo:UserName"];
                options.Password = Configuration["DatabaseAccountInfo:Password"];
            });

            services.AddSingleton<IBookmarkValueMapper, BookmarkValueMapper>();

            // This somehow does not work, so we are relying on the create in Startup
            /*
            services.AddSingleton<Serilog.ILogger>(logger =>
            {
                return new LoggerConfiguration().ReadFrom.Configuration(Configuration).CreateLogger();
            });
            */
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            //loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            //loggerFactory.AddDebug();
            loggerFactory.AddSerilog();

            app.UseIISPlatformHandler();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRuntimeInfoPage();

            app.UseApplicationInsightsRequestTelemetry();

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseStaticFiles();

            app.UseMvc();
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
