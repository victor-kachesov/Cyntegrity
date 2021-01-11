import axios from 'axios'

export default {
    createClient() {

        const apiUrl = process.env.VUE_APP_CYNTEGRITY_API_URL || 'http://localhost:1337/api';

        return axios.create({
            baseURL: apiUrl,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}
