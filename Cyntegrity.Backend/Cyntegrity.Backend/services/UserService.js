module.exports = class UserService {
    constructor({ userRepository }) {
        console.log('creating message service')
        this.users = userRepository
    }

    getUsers() {
        return this.users.getUsers();
    }
}