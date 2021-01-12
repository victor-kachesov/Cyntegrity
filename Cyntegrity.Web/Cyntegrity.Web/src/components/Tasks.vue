<template>
    <div class="tasks">

        <div>List of tasks</div>
        <ul id="example-1">
            <li v-for="task in tasks" :key="task._id">
                Name:{{ task.name }} | Average time: {{ task.averageTime }}
                <button v-bind:disabled="!canCurrentUserDeleteTask(task)" @click="deleteTask(task._id)">
                    Delete
                </button>
            </li>
        </ul>
        <div>
            <div>
                New task
            </div>
            <div>
                Name: <input v-model="newTask.name" placeholder="Name">
            </div>
            <div>
                Average time: <input v-model.number="newTask.averageTime" type="number">
            </div>
            <button v-bind:disabled="!canAddTask()" @click="addTask">Add task</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Tasks',

        props: {
            msg: String
        },

        data: function () {
            return {
                newTask: {
                    name: null,
                    averageTime: 0
                }
            }
        },

        computed: {
            currentUser() {
                return this.$store.state.currentUser;
            },

            tasks() {
                return this.$store.state.tasks;
            },
        },

        methods: {
            addTask() {
                this.$store.dispatch('addTask', { name: this.newTask.name, averageTime: this.newTask.averageTime, owner: this.currentUser._id });
            },

            deleteTask(taskId) {
                this.$store.dispatch('deleteTask', { taskId, userId: this.currentUser._id });
            },

            canAddTask() {
                return this.currentUser != null;
            },

            canCurrentUserDeleteTask(task) {

                if (this.currentUser == null) {
                    return false;
                }

                return this.currentUser._id == task.owner;
            }
        },

        created() {
            this.$store.dispatch('getTasks')
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

