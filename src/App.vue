<template>
  <div id="app">
      <nav>
        <router-link to="/tasks">Tasks</router-link> |
        <router-link to="/users">Users</router-link> |
        <router-link to="/user/22">View user</router-link> |
        <router-link to="/taskEdit/22">Edit task</router-link> |
        <router-link to="/task/22">View task</router-link> |
        <router-link to="/nf">Not found</router-link>
      </nav>
      <p>{{loading}}</p>
      <router-view :key="$route.fullPath" />
  </div>
</template>


<script>
import { api } from '@/api/api.js';

export default {
  mounted() {
    this.$store.dispatch('setLoading')
    api.users.all()
      .then(response => console.group(response));
    console.log(this.$store.getters.allEvents)
  },
  computed: {
    allEvents() {
      return this.$store.getters.allEvents
    },
    loading() {
      return this.$store.getters.loading? 'loading': 'not loading'
    }
  }
}

</script>


<style scoped lang="scss">
@import './_styles/style.sass';


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: $background;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
