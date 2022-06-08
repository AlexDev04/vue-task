<template>
    <div id="root">
        <TaskHeader mode="taskList" :task="task" />
        <main class="taskList">
            <section class="taskList-sorting">
                <MultiDropdown class="taskList-sorting-type" v-on:select="handleType" :selected="type">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'React')? slotProps.active: '']" valEn="React" text="React" :checked="slotProps.sel.find(el => el == 'React')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'Vue')? slotProps.active: '']" valEn="Vue" text="Vue" :checked="slotProps.sel.find(el => el == 'Vue')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'Angular')? slotProps.active: '']" valEn="Angular" text="Angular" :checked="slotProps.sel.find(el => el == 'Angular')" />
                        </div>
                    </template>
                </MultiDropdown>
                <TextInput placeholder="Название задачи" class="taskList-sorting-name" @input="changeName" :val="name" />
                <MultiDropdown class="taskList-sorting-username" v-on:select="handleUser" :selected="user">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'React')? slotProps.active: '']" valEn="React" text="React" :checked="slotProps.sel.find(el => el == 'React')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'Vue')? slotProps.active: '']" valEn="Vue" text="Vue" :checked="slotProps.sel.find(el => el == 'Vue')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'Angular')? slotProps.active: '']" valEn="Angular" text="Angular" :checked="slotProps.sel.find(el => el == 'Angular')" />
                        </div>
                    </template>
                </MultiDropdown>
                <MultiDropdown class="taskList-sorting-status" v-on:select="handleStatus" :selected="status">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'React')? slotProps.active: '']" valEn="React" text="React" :checked="slotProps.sel.find(el => el == 'React')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'Vue')? slotProps.active: '']" valEn="Vue" text="Vue" :checked="slotProps.sel.find(el => el == 'Vue')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'Angular')? slotProps.active: '']" valEn="Angular" text="Angular" :checked="slotProps.sel.find(el => el == 'Angular')" />
                        </div>
                    </template>
                </MultiDropdown>
                <MultiDropdown class="taskList-sorting-priority" v-on:select="handleRank" :selected="rank">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'React')? slotProps.active: '']" valEn="React" text="React" :checked="slotProps.sel.find(el => el == 'React')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'Vue')? slotProps.active: '']" valEn="Vue" text="Vue" :checked="slotProps.sel.find(el => el == 'Vue')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'Angular')? slotProps.active: '']" valEn="Angular" text="Angular" :checked="slotProps.sel.find(el => el == 'Angular')" />
                        </div>
                    </template>
                </MultiDropdown>
                <MyBut type="primary" @click="click">Применить</MyBut>
            </section>
            <section class="taskList-list">
            </section>
            <MyPaging v-on:toPage="toPage" v-on:nextPage="pageUp" v-on:prevPage="pageDn" :page="paging.page" :total="paging.total" />
        </main>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            task: {
                assigned: 'Алексей',
                user: 'Максим',
                typeRu: 'Задача',
                typeEn: 'task',
                rankRu: 'Средний',
                rankEn: 'middle',
                status: 'opened',
                dateOfCreation: '01.01.2022',
                dateOfUpdate: '01.05.2022',
                timeInMinutes: 30,
                title: 'Настроить прокси',
                desc: 'Задачка',
                comments: ['ok', 'go']
            },
            paging: {
                page: 0,
                total: 48
            },
            name: '',
            type: '',
            user: '',
            status:'',
            rank: ''
        }
    },
    methods: {
        ...mapActions(['setActiveTab', 'setFilters']),
        click() { console.log("click"); },
        pageUp() {
            this.paging.page = this.paging.page + 1
        },
        pageDn() {
            this.paging.page = this.paging.page - 1
        },
        toPage(p) {
            this.paging.page = p
        },
        changeName(evt) {
            this.name = evt.target.value
        },
        handleType(val) {
            console.log( val)
            this.type = val
        },
        handleUser(val) {
            this.user = val
        },
        handleStatus(val) {
            this.status = val
        },
        handleRank(val) {
            this.rank = val
        }
    },
    computed: {
        ...mapGetters(['activeTab', 'filters', 'getCurrentFilters']),
        curPage() {
            return this.paging.page
        }
    },
    mounted() {
        console.log(this.getCurrentFilters);
        this.setActiveTab(this.$route.fullPath);
        this.name = this.filters[this.activeTab]['taskName'];
        this.type = this.filters[this.activeTab]['type'];
        this.user = this.filters[this.activeTab]['user'];
        this.status = this.filters[this.activeTab]['status'];
        this.rank = this.filters[this.activeTab]['rank'];
        this.paging.page = this.filters[this.activeTab]['pagingPage']
    },
    watch: {
        name(val) {
            this.setFilters({filter: 'taskName', value: val})
            console.log(this.name)
        },
        type(val) {
            this.setFilters({filter: 'type', value: val})
        },
        user(val) {
            this.setFilters({filter: 'user', value: val})
        },
        status(val) {
            this.setFilters({filter: 'status', value: val})
        },
        rank(val) {
            this.setFilters({filter: 'rank', value: val})
        },
        curPage(val) {
            this.setFilters({filter: 'pagingPage', value: val})
        }
    }
}
</script>


<style scoped lang="sass">
@import '../../_styles/style.sass'

.taskList
    display: flex
    flex-flow: column nowrap
    align-items: center
    justify-content: flex-start

    &-sorting
        width: 100%
        height: 10%
        display: flex
        justify-content: space-between

        &-type
            width: 10%

        &-name
            width: 45%

        &-username
            width: 15%

        &-status
            width: 10%

        &-priority
            width: 10%

    &-list
        width: 100%
        height: 80%
        @include board()
        overflow-y: auto

        &-item-grayed
            background-color: #F2F2F2


    &-pager
        display: flex
        align-items: center
        height: 10%

@media screen and (max-width: 1080px)

    .taskList-sorting
        &-type
            width: 10%

        &-name
            width: 35%

        &-username
            width: 17%

        &-status
            width: 14%

        &-priority
            width: 18%
</style>