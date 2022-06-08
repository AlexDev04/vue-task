export default {
    actions: {},
    mutations: {},
    state: {
        events: ['ok', 'no']
    },
    getters: {
        allEvents(state) {
            return state.events
        }
    }
}