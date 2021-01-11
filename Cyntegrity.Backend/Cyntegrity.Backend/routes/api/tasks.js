'use strict';
const express = require('express');
const router = express.Router();

// Register a route..
router.get('/', function (req, res, next) {

    // Use the scope to resolve the message service.
    const taskService = req.scope.resolve('taskService')

    var p = taskService.getTasks();

    p.then((tasks) => {
        return res.json(tasks)
    }).catch((error) => {
        next(error)
    })
})

router.post('/', function (req, res, next) {

    // Use the scope to resolve the message service.
    const taskService = req.scope.resolve('taskService')

    var task = req.body

    taskService.addTask(task)
        .then(() => {
            return res.send('Success')
        }).catch((error) => {
            next(error)
        })
})

router.delete('/:id', function (req, res, next) {

    // Use the scope to resolve the message service.
    const taskService = req.scope.resolve('taskService')

    var userId = req.headers.userid

    var id = req.params.id

    taskService.deleteTask(id, userId)
        .then(() => {
            return res.send('Success')
        }).catch((error) => {
            next(error)
        })
})

module.exports = router;
