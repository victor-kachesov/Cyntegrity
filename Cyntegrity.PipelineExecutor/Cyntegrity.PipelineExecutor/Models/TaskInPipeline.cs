using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Cyntegrity.PipelineExecutor.Models
{
    [BsonIgnoreExtraElements]
    public class TaskInPipeline
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("averageTime")]
        public decimal AverageTime { get; set; }

        [BsonElement("taskId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string TaskId { get; set; }
    }
}
