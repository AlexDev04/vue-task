import { api } from "@/api/api"

export default {
    actions: {
        fetchAllTasks({ commit }) {
            api.tasks.all(0, 0)
                .then(response => commit('allTasks', response.data))
        },
        fetchTasks({ commit }, {filter, page}) {
            api.tasks.filter(page, 10, filter)
                .then(response => commit('filteredTasks', response.data))
            
        },
        taskById({ commit }, id) {
            api.tasks.id(id)
                .then(response => commit('taskById', response.data))

        }
    },
    mutations: {
        allTasks(state, data) {
            state.tasksAll = data;
        },
        filteredTasks(state, data) {
            state.tasks = data;
            console.log(state.tasks)
        },
        taskById(state, data) {
            state.curTask = data
        }
    },
    state: {
        tasksAll: {},
        tasks: {total: 10},
        curTask: {}
    },
    getters: {
        getTasks(state) {
            return state.tasks
        },
        getTask(state) {
            return state.curTask
        }
    }
}