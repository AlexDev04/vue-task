import { api } from "@/api/api"

export default {
    actions: {
        login({ commit }, {login, password}) {
            api.users.login(login, password)
                .then(response => commit('login', response.data))
        },
        fetchUsers({ commit }, page) {
            api.users.pagination(page, 10)
                .then(response => commit('filteredUsers', response.data))
        },
        fetchAllUsers({ commit }) {
            api.users.all()
                .then(response => commit('allUsers', response.data))
        }
    },
    mutations: {
        login(state, data) {
            state.curUser = data;
            console.log(state.curUser)
        },
        filteredUsers(state, data) {
            state.users = data;
        },
        allUsers(state, data) {
            state.usersAll = data;
            console.log(state.users)
        }

    },
    state: {
        usersAll: [],
        users: {total: 10},
        curUser: {},
        openeduser: {}
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getAllUsers(state) {
            return state.usersAll
        }
    }
}