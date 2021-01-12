module.exports = class UserService {
    constructor({ userRepository }) {
        this.users = userRepository
    }

    getUsers() {
        return this.users.getUsers();
    }
}