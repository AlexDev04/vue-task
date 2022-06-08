import Vue from "vue";
import Vuex from 'vuex';
import users from './modules/users';
import events from './modules/events';
import main from './modules/main'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        events,
        users,
        main
    }
})