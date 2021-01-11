using Cyntegrity.PipelineExecutor.Contracts;
using Cyntegrity.PipelineExecutor.Models;
using Cyntegrity.PipelineExecutor.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace Cyntegrity.PipelineExecutor
{
    public class PipelineExecutor : IPipelineExecutor
    {
        public PipelineExecutor(IPipelineService pipelineService)
        {
            _pipelineService = pipelineService;
        }

        private readonly IPipelineService _pipelineService;
        
        public async Task<long> ExecuteAsync(string pipelineId)
        {
            Stopwatch watch = null;
            Pipeline pipeline = null;

            try
            {
                watch = Stopwatch.StartNew();

                pipeline = await _pipelineService.GetAsync(pipelineId);
            }
            finally 
            {
                watch?.Stop();
            }

            long runTime = watch.ElapsedMilliseconds;

            await SetRunTimeAsync(pipeline, runTime);

            return runTime;
        }

        private async Task SetRunTimeAsync(Pipeline pipeline, long runTime)
        {
            pipeline.RunTime = runTime;

            await _pipelineService.UpdateAsync(pipeline.Id, pipeline);
        }
    }
}
