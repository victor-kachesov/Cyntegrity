import apiClientHelper from './apiClientHelper'

export default {

    getPipelines(cb, errorCb) {
        apiClientHelper.createClient()
            .get('pipelines')
            .then(response => cb(response.data))
            .catch(function (error) {
                errorCb(error)
            })
    },

    getPipeline(pipelineId, cb, errorCb) {
        apiClientHelper.createClient()
            .get('pipelines/' + pipelineId)
            .then(response => cb(response.data))
            .catch(function (error) {
                errorCb(error)
            })
    },

    addPipeline(pipeline, cb, errorCb) {

        apiClientHelper.createClient()
            .post('pipelines', pipeline)
            .then(response => cb(response.data))
            .catch(function (error) {
                errorCb(error)
            })
    },

    calculateAverageTime(pipelineId, cb, errorCb) {

        apiClientHelper.createClient()
            .post('pipelines/averageTime/' + pipelineId)
            .then(response => cb(response.data))
            .catch(function (error) {
                errorCb(error)
            })
    },
    
    runPipeline(pipelineId, cb, errorCb) {

        apiClientHelper.createClient()
            .post('pipelines/runPipeline/' + pipelineId)
            .then(response => cb(response.data))
            .catch(function (error) {
                errorCb(error)
            })
    }
}