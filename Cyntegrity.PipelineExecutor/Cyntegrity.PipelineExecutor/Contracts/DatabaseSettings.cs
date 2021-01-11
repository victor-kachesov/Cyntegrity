using System;
using System.Collections.Generic;
using System.Text;

namespace Cyntegrity.PipelineExecutor.Contracts
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
