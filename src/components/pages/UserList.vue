<template>
    <div id="root">
        <UserHeader mode="userList"/>
        <main class="userList">
            <section class="userList-list">
                <!-- {users && users.map(el => 
                <article 
                    key={el.id} 
                    onClick={() => handleNav(el.id)}
                    className={`${users.indexOf(el) % 2 == 0 && 'userList-list-item-grayed'} userList-list-item`}
                >
                    {el.username}
                </article>)} -->
            </section>
            <MyPaging class="userList-pager" v-on:toPage="toPage" v-on:nextPage="pageUp" v-on:prevPage="pageDn" :page="paging.page" :total="paging.total" />
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
                total: 48
            }
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
    }
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