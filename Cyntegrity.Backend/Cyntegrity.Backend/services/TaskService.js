const ObjectID = require("mongodb").ObjectID

module.exports = class UserService {
    constructor({ taskRepository, userService }) {
        console.log('creating message service')
        this.tasks = taskRepository
        this.userService = userService
    }

    async getTasks() {
        return this.tasks.getTasks()
    }

    async addTask(task) {
        return this.tasks.addTask(task)
    }

    async deleteTask(_id, userId) {

        var task = await this.tasks.getTask(_id)

        if (task == null) {
            throw new Error('Task not found');
        }

        var userObjectId = ObjectID(userId);

        if (task.owner && !task.owner.equals(userObjectId)) {
            throw new Error('You cannot delete this task');
        }

        return this.tasks.deleteTask(_id)
    }
}