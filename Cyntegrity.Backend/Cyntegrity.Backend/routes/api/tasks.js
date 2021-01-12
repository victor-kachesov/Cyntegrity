'use strict';
const express = require('express');
const router = express.Router();

const TasksServiceName = 'taskService'

// Register a route..
router.get('/', function (req, res, next) {

    const taskService = req.scope.resolve(TasksServiceName)

    var p = taskService.getTasks();

    p.then((tasks) => {
        return res.json(tasks)
    }).catch((error) => {
        next(error)
    })
})

router.post('/', function (req, res, next) {

    const taskService = req.scope.resolve(TasksServiceName)

    var task = req.body

    taskService.addTask(task)
        .then(() => {
            return res.send('Success')
        }).catch((error) => {
            next(error)
        })
})

router.delete('/:id', function (req, res, next) {

    const taskService = req.scope.resolve(TasksServiceName)

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
