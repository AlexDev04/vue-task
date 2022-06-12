// import Vue from "vue"

export default {
    actions: {
        setLoading({ commit }) {
            commit('setLoading')
        },
        setNotLoading({ commit }) {
            commit('setNotLoading')
        },
        setActiveTab({ commit }, value) {
            commit('setActiveTab', value)
        },
        setFilters({ commit }, {filter, value}) {
            commit('setFilters', {filter, value})
        },
        changeModal({ commit }) {
            commit('setModal')
        }
    },
    mutations: {
        setLoading(state) {
            state.loading = true
        },
        setNotLoading(state) {
            state.loading = false
        },
        setFilters(state, data) {
            if(!state.filters[state.activeTab]) state.filters[state.activeTab] = {}
            state.filters[state.activeTab][data.filter] = data.value
            // Vue.prototype.$set(state.filters, state.activeTab, data)
        },
        setActiveTab(state, data) {
            state.activeTab = data
        },
        setModal(state) {
            state.modal = !state.modal
        }
    },
    state: {
        filters: {},
        loading: false,
        activeTab: '',
        modal: false
    },
    getters: {
        loading: state => state.loading,
        activeTab: state => state.activeTab,
        filters: state => state.filters,
        getCurrentFilters: (state, getters) => state.filters[getters.activeTab],
        isModal: state => state.modal
    }
}