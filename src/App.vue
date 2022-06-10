<template>
  <div id="app">
    <MainHeader :user="getAuthorizedUser" />
    <router-view :key="$route.fullPath" />
  </div>
</template>


<script>
import { api } from '@/api/api.js';
import { mapGetters } from 'vuex';

export default {
    mounted() {
        this.$store.dispatch("setLoading");
        api.users.all()
            .then(response => console.group(response));
        console.log(this.$store.getters.allEvents);
    },
    computed: {
      ...mapGetters(['getAuthorizedUser']),
      allEvents() {
          return this.$store.getters.allEvents;
      },
      loading() {
          return this.$store.getters.loading ? "loading" : "not loading";
      }
    },
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
