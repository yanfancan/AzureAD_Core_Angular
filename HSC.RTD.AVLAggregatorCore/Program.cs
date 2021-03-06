﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace HSC.RTD.AVLAggregatorCore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var webHost = new WebHostBuilder()
         .UseKestrel()
         .UseContentRoot(Directory.GetCurrentDirectory())
         .ConfigureAppConfiguration((hostingContext, config) =>
         {
             var env = hostingContext.HostingEnvironment;
             config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                   .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
             config.AddEnvironmentVariables();
         })
         .UseApplicationInsights()
         .ConfigureLogging((hostingContext, logging) =>
         {
             logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
             logging.AddConsole();
             logging.AddDebug();
             logging.AddAzureWebAppDiagnostics();
         })
         .UseStartup<Startup>()
         .Build();

            webHost.Run();
        }
    }
}
