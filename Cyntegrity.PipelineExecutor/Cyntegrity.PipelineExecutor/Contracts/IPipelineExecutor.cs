using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cyntegrity.PipelineExecutor.Contracts
{
    public interface IPipelineExecutor
    {
        Task<long> ExecuteAsync(string pipelineId);
    }
}
