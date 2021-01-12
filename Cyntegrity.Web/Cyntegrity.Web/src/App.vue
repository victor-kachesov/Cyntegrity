<template>
    <div id="app">
        <h1>Cyntegrity</h1>
        <current-info></current-info>
        <div class="nav">
            <router-link to="/home">Home</router-link>
            <router-link to="/tasks">Tasks</router-link>
            <router-link to="/pipelines">Pipelines</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import VueRouter from 'vue-router';
    import Home from './components/Home.vue';
    import Tasks from './components/Tasks.vue';
    import Pipelines from './components/Pipelines.vue';
    import CurrentInfo from './components/CurrentInfo.vue';

    // Define some routes
    const routes = [
        { path: '/home', component: Home },
        { path: '/tasks', component: Tasks },
        { path: '/pipelines', component: Pipelines }
    ]

    // Create the router instance
    const router = new VueRouter({
        routes
    })

    export default {
        name: 'app',
        components: {
            Home,
            Tasks,
            Pipelines,
            CurrentInfo
        },
        router: router,

        created() {
            router.push('/home')
        }
    };
</script>

<style>
    .nav a {
        line-height: 1em;
        display: inline-block;
        margin: 20px;
    }
</style>

