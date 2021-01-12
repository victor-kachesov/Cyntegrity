'use strict';
const debug = require('debug');
const express = require('express');
const cors = require('cors')
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { pipeline } = require('stream');
const awilix = require('awilix');
const { createContainer, asValue, asFunction, asClass } = awilix

const routes = require('./routes/index');
const users = require('./routes/api/users');
const tasks = require('./routes/api/tasks');
const pipelines = require('./routes/api/pipelines');

const app = express();

// Create a container.
const container = createContainer()

// Register usefull stuff
const UserService = require('./services/UserService')
const TaskService = require('./services/TaskService')
const PipelineService = require('./services/PipelineService')
const makeUserRepository = require('./repositories/userRepository')
const makeTaskRepository = require('./repositories/taskRepository');
const makePipelineRepository = require('./repositories/pipelineRepository');

container.register({

    DB_CONNECTION_STRING: asValue(process.env.CYNTEGRITY_DB_CONNECTON_STRING || 'mongodb://localhost:27017'),
    DB_NAME: asValue(process.env.CYNTEGRITY_DB_NAME || 'CyntegrityDb'),

    PIPELINE_EXECUTOR_PATH: asValue(process.env.CYNTEGRITY_PIPELINE_EXECUTOR_PATH || '../../Cyntegrity.PipelineExecutor/Cyntegrity.PipelineExecutor/bin/Release/netcoreapp3.1/publish/Cyntegrity.PipelineExecutor.dll'),

    // resolved for each request.
    userService: asClass(UserService).scoped(),
    taskService: asClass(TaskService).scoped(),
    pipelineService: asClass(PipelineService).scoped(),

    // only resolved once
    userRepository: asFunction(makeUserRepository).singleton(),
    taskRepository: asFunction(makeTaskRepository).singleton(),
    pipelineRepository: asFunction(makePipelineRepository).singleton(),
})

app.use(cors())

// For each request we want a custom scope.
app.use(function (req, res, next) {

    console.log('Registering scoped stuff')

    req.scope = container.createScope()

    return next()
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/users', users);
app.use('/api/tasks', tasks);
app.use('/api/pipelines', pipelines);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.CYNTEGRITY_BACKEND_PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Cyntegrity backend server listening on port ' + server.address().port);
});
