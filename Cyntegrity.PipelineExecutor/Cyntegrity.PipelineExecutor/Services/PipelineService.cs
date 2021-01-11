using Cyntegrity.PipelineExecutor.Contracts;
using Cyntegrity.PipelineExecutor.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cyntegrity.PipelineExecutor.Services
{
    public class PipelineService : IPipelineService
    {
        public PipelineService(IDatabaseSettings databaseSettings) 
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);

            _pipelines = database.GetCollection<Pipeline>("Pipelines");
        }

        private readonly IMongoCollection<Pipeline> _pipelines;

        public async Task<Pipeline> GetAsync(string id)
        {
            var pipelines = await _pipelines.FindAsync(pipeline => pipeline.Id == id);
            
            return pipelines.FirstOrDefault();
        }

        public async Task UpdateAsync(string id, Pipeline pipelineIn)
        {
            await _pipelines.ReplaceOneAsync(pipeline => pipeline.Id == id, pipelineIn);
        }
    }
}
