import apiClientHelper from './apiClientHelper'

export default {
    getUsers(cb, errorCb) {
        apiClientHelper.createClient()
            .get('users')
            .then(response => cb(response.data))
            .catch(function (error) {
                errorCb(error)
            })
    },
}