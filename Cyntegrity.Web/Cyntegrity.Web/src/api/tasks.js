import apiClientHelper from './apiClientHelper'

export default {
    getTasks(cb, errorCb) {
        apiClientHelper.createClient()
            .get('tasks')
            .then(response => cb(response.data))
            .catch(function (error) {
                errorCb(error)
            })
    },

    addTask(task, cb, errorCb) {

        var taskInStorage = {
            name: task.name,
            averageTime: task.averageTime,
            owner: task.owner
        }

        apiClientHelper.createClient()
            .post('tasks', taskInStorage)
            .then(response => cb(response.data))
            .catch(function (error) {
                errorCb(error)
            })
    },

    deleteTask(taskId, userId, cb, errorCb) {

        apiClientHelper.createClient()
            .delete('tasks/' + taskId, { headers: { 'userid': userId } })
            .then(response => cb(response.data))
            .catch(function (error) {
                errorCb(error)
            })
    }
}