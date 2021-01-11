'use strict';
const express = require('express');
const router = express.Router();

// Register a route..
router.get('/', function (req, res, next) {

    // Use the scope to resolve the message service.
    const userService = req.scope.resolve('userService')

    var p = userService.getUsers();

    p.then((users) => {
        return res.json(users)
    }).catch((error) => {
       next(error)
    })
})

module.exports = router;
