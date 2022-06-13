<template>
    <div id="root">
        <UserHeader mode="userList"/>
        <main class="userList">
            <section class="userList-list">
                <UserListItem v-for="(el, index) in getUsers.data" :user="el" :index="index" :key="el.id" />
            </section>
            <MyPaging class="userList-pager" v-on:toPage="toPage" v-on:nextPage="pageUp" v-on:prevPage="pageDn" :page="paging.page" :total="getUsers.total" />
        </main>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            paging: {
                page: 0,
            }
        };
    },
    methods: {
        ...mapActions(["setActiveTab", "setFilters", "fetchAllUsers", "fetchUsers"]),
        pageUp() {
            this.paging.page = this.paging.page + 1;
        },
        pageDn() {
            this.paging.page = this.paging.page - 1;
        },
        toPage(p) {
            this.paging.page = p;
        },
    },
    computed: {
        ...mapGetters(["isAuth","activeTab", "filters", "getCurrentFilters", 'getUsers']),
        curPage() {
            return this.paging.page;
        }
    },
    mounted() {
        if(!this.isAuth) this.$router.push({name: 'auth'})
        this.fetchAllUsers();
        this.fetchUsers(this.curPage);
        this.setActiveTab(this.$route.fullPath);
        this.paging.page = this.filters[this.activeTab]["pagingPage"];
    },
    watch: {
        curPage(val) {
            this.setFilters({ filter: "pagingPage", value: val });
            this.fetchUsers(val)
        }
    },
}
</script>


<style scoped lang="sass">
@import '../../_styles/templates'
@import '../../_styles/vars'

.userList

    &-list
        width: 100%
        height: 90%
        @include board()
        overflow-y: scroll

        &-item
            display: flex
            align-items: center
            height: 68px
            color: #000000
            padding: 0 10px

            &-grayed
                background-color: #F2F2F2

    &-pager
        height: 10%
</style>