using Cyntegrity.PipelineExecutor.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cyntegrity.PipelineExecutor.Contracts
{
    public interface IPipelineService
    {
        Task<Pipeline> GetAsync(string id);

        Task UpdateAsync(string id, Pipeline pipelineIn);
    }
}
