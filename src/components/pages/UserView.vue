<template>
    <div id="root">
        <UserHeader mode="userView" />
        <main class="userPage">
            <div class="userPage-left">
                <div class="userPage-left-img">
                    <img :src="user.userImg" />
                </div>
                <h3 class="placeholder">О себе</h3>
                <p>
                    {{user.about}}
                </p>
            </div>
            <hr />
            <div class="userPage-right">
                <h3 class="placeholder">Задачи</h3>
                <section class="userPage-right-tasks">
                    <!-- {tasks && tasks.map(el => 
                    <TaskListItem
                        className={tasks.indexOf(el) % 2 == 0 && 'userPage-right-tasks-item-grayed'}
                        type={el.type}
                        taskName={el.title}
                        status={el.status}
                        rank={el.rank}
                        id={el.id}
                    />)} -->
                </section>
                <MyPaging class="userList-pager" v-on:toPage="toPage" v-on:nextPage="pageUp" v-on:prevPage="pageDn" :page="paging.page" :total="paging.total" />
            </div>
        </main>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            user: {
                about: 'Some text',
                userImg: ''
            },
            paging: {
                page: 0,
                total: 48
            },
        }
    },
    methods: {
        ...mapActions(['setActiveTab', 'setFilters']),
        pageUp() {
            this.paging.page = this.paging.page + 1;
        },
        pageDn() {
            this.paging.page = this.paging.page - 1;
        },
        toPage(p) {
            this.paging.page = p
        },
    },
    computed: {
        ...mapGetters(['activeTab', 'filters', 'getCurrentFilters']),
        curPage() {
            return this.paging.page
        }
    },
    mounted() {
        this.setActiveTab(this.$route.fullPath);
        this.paging.page = this.filters[this.activeTab]['pagingPage']
    },
    watch: {
        curPage(val) {
            this.setFilters({filter: 'pagingPage', value: val})
        }
    },
    props: {
        id: Number
    }
}
</script>

<style lang="sass">
@import '../../_styles/style'

.userPage
    display: flex

    hr
        margin: 0 20px

    &-left
        display: flex
        flex-flow: column nowrap
        width: 40%
        align-items: flex-start

        &-img
            display: inline-block
            border-radius: 50%
            overflow: hidden
            width: 186px
            height: 186px

        img
            width: 100%
            height: 100%
            object-fit: cover

        h3
            font-size: 16px
            margin: 20px 0 20px 0

        p
            margin: 0

    &-right
        display: flex
        flex-direction: column
        width: 60%

        &-tasks
            width: 100%
            overflow-y: auto
            @include board()

            &-item-grayed
                background-color: #F2F2F2

            .taskListItem
                justify-content: space-between

                &-type
                    width: 10%

                &-name
                    justify-content: flex-start
                    width: 25%

                &-status
                    width: 15%

                &-rank
                    width: 15%
</style>