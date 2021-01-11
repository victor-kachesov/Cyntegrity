using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cyntegrity.PipelineExecutor.Models
{
    [BsonIgnoreExtraElements]
    public class Pipeline
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("averageTime")]
        public long AverageTime { get; set; }

        [BsonElement("tasks")]
        public TaskInPipeline[] Tasks { get; set; }

        [BsonElement("runTime")]
        public long RunTime { get; set; }
    }
}
