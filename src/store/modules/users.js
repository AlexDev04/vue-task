import { api } from "@/api/api"

export default {
    actions: {
        authorize({ commit }, {login, password}) {
            console.log(login, password)
            api.users.login(login, password)
                .then(response => commit('authorize', {data: response.data, password: password}))
        },
        logOut({ commit }) {
            commit('logOut')
        },
        fetchUsers({ commit }, page) {
            api.users.pagination(page, 10)
                .then(response => commit('filteredUsers', response.data))
        },
        fetchAllUsers({ commit }) {
            api.users.all()
                .then(response => commit('allUsers', response.data))
        },
        userById({ commit }, id) {
            console.log(id)
            api.users.id(id)
                .then(response => commit('userById', response.data))

        }
    },
    mutations: {
        authorize(state, data) {
            state.curUser = data.data;
            state.curUser.password = data.password
            state.authorized = true;
            console.log(state.curUser)
        },
        logOut(state) {
            state.authorized = false
        },
        filteredUsers(state, data) {
            state.users = data;
        },
        allUsers(state, data) {
            state.usersAll = data;
            console.log(state.users)
        },
        userById(state, data) {
            console.log(data)
            state.openedUser = data
            console.log(state.openedUser)
        }

    },
    state: {
        usersAll: [],
        users: {total: 10},
        curUser: {},
        openedUser: {},
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
        },
        getOpenedUser(state) {
            return state.openedUser
        }
    }
}