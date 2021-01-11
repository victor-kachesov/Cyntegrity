import Vue from 'vue'
import Vuex from 'vuex'
import users from '../api/users'
import tasks from '../api/tasks'
import pipelines from '../api/pipelines'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        count: 0,
        users: [],
        currentUser: null,
        tasks: [],
        pipelines: [],
        pipelineTasks: [],
        pipelineFinishedMessage: null
    },

    // actions
    actions: {
        getUsers({ commit }) {
            users.getUsers(
                (users) => commit('setUsers', users),
                (error) => alert('Error during getting users: ' +  error)
            )
        },

        getTasks({ commit }) {
            tasks.getTasks(
                (tasks) => commit('setTasks', tasks),
                (error) => alert('Error during getting tasks: ' + error)
            )
        },

        addTask({ dispatch }, task) {
            tasks.addTask(task,
                () => dispatch('getTasks'),
                (error) => alert('Error of adding task: ' + error)
            )
        },

        deleteTask({ dispatch }, { taskId, userId }) {
            tasks.deleteTask(taskId, userId,
                () => dispatch('getTasks'),
                (error) => alert('Error of deleting task: ' + error)
            )
        },

        addTaskToPipeline({ commit }, pipelineTask) {
            commit('addTaskToPipeline', pipelineTask);
        },

        deleteTaskFromPipeline({ commit }, pipelineTaskId) {
            commit('deleteTaskFromPipeline', pipelineTaskId);
        },

        getPipelines({ commit }) {
            pipelines.getPipelines(
                (pipelines) => commit('setPipelines', pipelines),
                (error) => alert('Error of getting pipelines: ' + error)
            )
        },

        addPipeline({ dispatch, commit }, pipeline) {
            pipelines.addPipeline(pipeline,
                () => {
                    commit('setPipelineTasks', [])
                    dispatch('getPipelines')
                },
                () => alert('Error of adding pipeline')
            )
        },

        calculatePipelineAverageTime({ commit }, pipelineId) {

            pipelines.calculateAverageTime(pipelineId,
                (averageTime) => {
                    commit('setPipelineAverageTime', { pipelineId: pipelineId, averageTime: averageTime })
                },
                () => alert('Error of calculating average time')
            )
        },

        runPipeline({ dispatch, commit }, pipelineId) {

            commit('setPipelineFinishedMessage', { message: null })

            pipelines.runPipeline(pipelineId,
                () => {
                    dispatch('updatePipelineRunTime', pipelineId)
                    dispatch('showPipelineFinished', pipelineId)
                },
                () => alert('Error of running pipeline')
            )
        },

        updatePipelineRunTime({ commit }, pipelineId) {

            pipelines.getPipeline(pipelineId,
                (pipeline) => {
                    if (pipeline != null) {
                        commit('setPipelineRunTime', { pipelineId: pipeline._id, runTime: pipeline.runTime })
                    }
                },
                () => alert('Error of getting pipeline')
            )
        },

        showPipelineFinished({ commit, state }, pipelineId) {
            var pipeline = state.pipelines.find(p =>
                p._id == pipelineId
            )

            if (pipeline != null) {

                const message = 'Pipeline ' + pipeline.name + ' finished'

                commit('setPipelineFinishedMessage', { message: message })
            }
        }
    },

    // mutations
    mutations: {
        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser;
        },

        setUsers(state, users) {
            state.users = users
        },

        setTasks(state, tasks) {
            state.tasks = tasks
        },

        setPipelines(state, pipelines) {
            state.pipelines = pipelines
        },

        setPipelineTasks(state, pipelineTasks) {
            state.pipelineTasks = pipelineTasks
        },

        addTaskToPipeline(state, pipelineTask) {
            state.pipelineTasks.push(pipelineTask);
        },

        deleteTaskFromPipeline(state, pipelineTaskId) {
            var index = state.pipelineTasks.findIndex(t =>
                t._id == pipelineTaskId
            )
            if (index > -1) {
                state.pipelineTasks.splice(index, 1);
            }
        },

        setPipelineAverageTime(state, { pipelineId, averageTime }) {

            var index = state.pipelines.findIndex(p =>
                p._id == pipelineId
            )

            if (index > -1) {

                var updatingPipline = state.pipelines[index]

                updatingPipline.averageTime = averageTime

                state.pipelines.splice(index, 1, updatingPipline)
            }
        },

        setPipelineRunTime(state, { pipelineId, runTime }) {

            var index = state.pipelines.findIndex(p =>
                p._id == pipelineId
            )

            if (index > -1) {

                var updatingPipline = state.pipelines[index]

                updatingPipline.runTime = runTime

                state.pipelines.splice(index, 1, updatingPipline)
            }
        },

        setPipelineFinishedMessage(state, { message }) {
            state.pipelineFinishedMessage = message
        }
    }
})