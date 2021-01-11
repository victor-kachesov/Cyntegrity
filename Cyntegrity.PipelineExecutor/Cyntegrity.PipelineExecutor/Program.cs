using Cyntegrity.PipelineExecutor.Contracts;
using Cyntegrity.PipelineExecutor.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace Cyntegrity.PipelineExecutor
{
    class Program
    {
        static async Task Main(string[] args)
        {
            if (args == null || args.Length < 1)
            {
                Console.WriteLine("Pipeline id is missing");

                Environment.ExitCode = -1;

                return;
            }

            string pipelineId = args[0];

            Console.WriteLine($"Executing pipeline with id: '{pipelineId}'");

            var appConfig = GetConfig();

            var pipelineSevice = new PipelineService(appConfig.DatabaseSettings);

            var pipelineExecutor = new PipelineExecutor(pipelineSevice);

            long runTime = await pipelineExecutor.ExecuteAsync(pipelineId);

            Console.WriteLine($"Run time was: {runTime} ms");
        }

        private static AppConfig GetConfig()
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile($"appsettings.json", true, true);

            var config = builder.Build();

            var appConfig = config.Get<AppConfig>();

            return appConfig;
        }
    }
}
