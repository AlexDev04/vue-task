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
            console.log(id)
            api.tasks.id(id)
                .then(response => commit('taskById', response.data))
        },
        taskComments({ commit }, id) {
            api.comments.taskId(id)
                .then(response => commit('taskComments', response.data))
        },
        userTasks({ commit }, { id, page }) {
            api.tasks.filter(page, 10, {assignedUsers: [id]})
                .then(response => commit('userTasks', response.data))
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
            console.log(data)
            state.curTask = data
            switch(data.type) {
                case 'bug':
                    state.curTask.typeRu = 'Баг';
                    break;
                case 'task':
                    state.curTask.typeRu = 'Задача';
                    break;
            }
            switch(data.status) {
                case 'opened':
                    state.curTask.statusRu = 'Открыто';
                    break;
                case 'inProgress':
                    state.curTask.statusRu = 'В работе';
                    break;
                case 'testing':
                    state.curTask.statusRu = 'Тестируется';
                    break;
                case 'completed':
                    state.curTask.statusRu = 'Завершено';
                    break;
            }
            switch(data.rank) {
                case 'low':
                    state.curTask.rankRu = 'Низкий';
                    break;
                case 'medium':
                    state.curTask.rankRu = 'Средний';
                    break;
                case 'high':
                    state.curTask.rankRu = 'Высокий';
                    break;
            }
            console.log(state.curTask)
        },
        taskComments(state, data) {
            state.taskComments = data
        },
        userTasks(state, data) {
            state.userTasks = data
        }
    },
    state: {
        tasksAll: {},
        tasks: {total: 10},
        curTask: null,
        taskComments: [],
        userTasks: [],
        type: {task: 'Задача', bug: 'Баг'},
        status: {opened: 'Открыто', inProgress: 'В работе', testing: 'Тестируется', complete: 'Выаполнено'},
        rank: {low: 'Низкий', medium: 'Средний', high: 'Высокий'}
    },
    getters: {
        getTasks(state) {
            return state.tasks
        },
        getTask(state) {
            return state.curTask
        },
        getTaskComments(state) {
            return state.taskComments
        },
        getUserTasks(state) {
            return state.userTasks
        }
    }
}