<template>
    <div class="home">
        <ul>
            <li v-for="user in users"
                :key="user._id">
                {{ user.name }}
                <button v-bind:disabled="!canSelectUser(user)" @click="selectCurrentUser(user)">
                    Select
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Home',

        computed: {
            currentUser() {
                return this.$store.state.currentUser;
            },

            users() {
                return this.$store.state.users;
            },
        },

        methods: {
            canSelectUser(user) {
                if (this.currentUser == null) {
                    return true
                }

                if (user == null) {
                    return false
                }

                return this.currentUser._id != user._id
            },

            selectCurrentUser(user) {
                this.$store.commit('setCurrentUser', user);
            }
        },

        created() {
            this.$store.dispatch('getUsers')
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

