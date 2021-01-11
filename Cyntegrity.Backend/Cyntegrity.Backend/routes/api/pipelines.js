'use strict';
const express = require('express');
const router = express.Router();

const PipelineServiceName = 'pipelineService'

// Register a route..
router.get('/', function (req, res, next) {

    // Use the scope to resolve the message service.
    const pipelineService = req.scope.resolve(PipelineServiceName)

    var p = pipelineService.getPipelines();

    p.then((pipelines) => {
        return res.json(pipelines)
    }).catch((error) => {
        next(error)
    })
})

router.get('/:id', function (req, res, next) {

    // Use the scope to resolve the message service.
    const pipelineService = req.scope.resolve(PipelineServiceName)

    var id = req.params.id

    pipelineService.getPipeline(id)
        .then((pipeline) => {
            return res.json(pipeline)
        }).catch((error) => {
            next(error)
        })
})

router.post('/', function (req, res, next) {

    // Use the scope to resolve the message service.
    const pipelineService = req.scope.resolve(PipelineServiceName)

    var pipeline = req.body

    pipelineService.addPipeline(pipeline)
        .then(() => {
            return res.send('Success')
        }).catch((error) => {
            next(error)
        })
})

router.delete('/:id', function (req, res, next) {

    // Use the scope to resolve the message service.
    const pipelineService = req.scope.resolve(PipelineServiceName)

    var userId = req.headers.userid

    var id = req.params.id

    pipelineService.deletePipeline(id, userId)
        .then(() => {
            return res.send('Success')
        }).catch((error) => {
            next(error)
        })
})

router.post('/averageTime/:id', function (req, res, next) {

    // Use the scope to resolve the message service.
    const pipelineService = req.scope.resolve(PipelineServiceName)

    var id = req.params.id

    var p = pipelineService.calculateAverageTime(id);

    p.then((averageTime) => {
        return res.json(averageTime)
    }).catch((error) => {
        next(error)
    })
})

router.post('/runPipeline/:id', function (req, res, next) {

    // Use the scope to resolve the message service.
    const pipelineService = req.scope.resolve(PipelineServiceName)

    var id = req.params.id

    var p = pipelineService.runPipeline(id);

    p.then((result) => {
        return res.json(result)
    }).catch((error) => {
        next(error)
    })
})

module.exports = router;
