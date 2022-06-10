import { api } from "@/api/api"

export default {
    actions: {
        authorize({ commit }, {login, password}) {
            console.log(login, password)
            api.users.login(login, password)
                .then(response => commit('authorize', response.data))
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
        authorize(state, data) {
            state.curUser = data;
            state.authorized = true;
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
        openeduser: {},
        authorized: false
    },
    getters: {
        isAuth(state) {
            return state.authorized
        },
        getUsers(state) {
            return state.users
        },
        getAllUsers(state) {
            return state.usersAll
        },
        getAuthorizedUser(state) {
            return state.curUser
        }
    }
}