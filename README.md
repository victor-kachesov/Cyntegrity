# Cyntegrity app

System requirements: nodejs, npm, .net core 3.1, mongodb, mongorestore

Steps to run

1.	Restore backup of database.
Backup is located in folder resources\db_dump
To restore backup use mongorestore tool.
For example
mongorestore --host=localhost --port=27017 --gzip --nsFrom=CyntegrityDb.* --nsTo=CyntegrityDb2.* resources\db_dump
Where –host and –port should point to an existing mongodb server.
--nsTo parameter is new database name which will be used for backend

2.	Set up pipeline executor parameters.
Open file resources\pipeline_executor_bin\appSettings.json and edit parameters ConnectionString and DatabaseName. They should be the same as you entered in the first step.
For example
{
  "DatabaseSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "CyntegrityDb"
  }
}

3.	Start a backend server.
For that we need to set some environment variables.
Run following command in command prompt before start a backend server.
set CYNTEGRITY_BACKEND_PORT=1337
set CYNTEGRITY_DB_CONNECTON_STRING=mongodb://localhost:27017
set CYNTEGRITY_DB_NAME= CyntegrityDb
set CYNTEGRITY_PIPELINE_EXECUTOR_PATH= ../../Cyntegrity.PipelineExecutor/Cyntegrity.PipelineExecutor/bin/Release/netcoreapp3.1/publish/Cyntegrity.PipelineExecutor.dll
Where CYNTEGRITY_BACKEND_PORT – port for backend api
CYNTEGRITY_DB_CONNECTON_STRING – connection string to mongodb database from the frist step
CYNTEGRITY_DB_NAME – database name from the first step
CYNTEGRITY_PIPELINE_EXECUTOR_PATH – path to executor application from resources\pipeline_executor_bin folder
Then run following command
node app.js

4.	Start a frontend application.

