<template>
    <div class="current-info">
        <h2 v-if="currentUser">Current user: {{ currentUser.name }}</h2>
        <h2 v-else>Please select current user on home page</h2>
    </div>
</template>

<script>
    export default {
        name: 'current-info',

        computed: {
            currentUser() {
                return this.$store.state.currentUser;
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

