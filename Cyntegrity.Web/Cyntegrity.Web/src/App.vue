<template>
    <div id="app">
        <h1>Cyntegrity</h1>
        <current-info></current-info>
        <div class="nav">
            <!-- use router-link component for navigation. -->
            <!-- specify the link by passing the `to` prop. -->
            <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
            <router-link to="/home">Home</router-link>
            <router-link to="/tasks">Tasks</router-link>
            <router-link to="/pipelines">Pipelines</router-link>
        </div>
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
        <router-view></router-view>
    </div>
</template>

<script>
    import VueRouter from 'vue-router';
    import Home from './components/Home.vue';
    import Tasks from './components/Tasks.vue';
    import Pipelines from './components/Pipelines.vue';
    import CurrentInfo from './components/CurrentInfo.vue';

    // 2. Define some routes
    // Each route should map to a component. The "component" can
    // either be an actual component constructor created via
    // `Vue.extend()`, or just a component options object.
    // We'll talk about nested routes later.
    const routes = [
        { path: '/home', component: Home },
        { path: '/tasks', component: Tasks },
        { path: '/pipelines', component: Pipelines }
    ]

    // 3. Create the router instance and pass the `routes` option
    // You can pass in additional options here, but let's
    // keep it simple for now.
    const router = new VueRouter({
        routes // short for `routes: routes`
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

