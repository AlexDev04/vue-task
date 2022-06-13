<template>
    <div id="root">
        <TaskHeader mode="taskList" :task="task" />
        <main class="taskList">
            <section class="taskList-sorting">
                <MultiDropdown name="Тип" class="taskList-sorting-type" v-on:select="handleType" :selected="type">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'task')? slotProps.active: '']" valEn="task" text="Задача" :checked="slotProps.sel.find(el => el == 'task')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'bug')? slotProps.active: '']" valEn="bug" text="Баг" :checked="slotProps.sel.find(el => el == 'bug')" />
                        </div>
                    </template>
                </MultiDropdown>
                <TextInput placeholder="Название задачи" class="taskList-sorting-name" @input="changeName" :val="name" />
                <MultiDropdown name="Пользователь" class="taskList-sorting-username" v-on:select="handleUser" :selected="user">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox v-for="us in getAllUsers" :key="us.id" :class="[slotProps.className, slotProps.sel.find(el => el == us.id)? slotProps.active: '']" :valEn="us.id" :text="us.username" :checked="slotProps.sel.find(el => el == us.id)" />
                        </div>
                    </template>
                </MultiDropdown>
                <MultiDropdown name="Статус" class="taskList-sorting-status" v-on:select="handleStatus" :selected="status">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'opened')? slotProps.active: '']" valEn="opened" text="Открыто" :checked="slotProps.sel.find(el => el == 'opened')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'inProgress')? slotProps.active: '']" valEn="inProgress" text="В работе" :checked="slotProps.sel.find(el => el == 'inProgress')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'testing')? slotProps.active: '']" valEn="testing" text="Тестируется" :checked="slotProps.sel.find(el => el == 'testing')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'complete')? slotProps.active: '']" valEn="complete" text="Сделано" :checked="slotProps.sel.find(el => el == 'complete')" />
                        </div>
                    </template>
                </MultiDropdown>
                <MultiDropdown name="Приоритет" class="taskList-sorting-priority" v-on:select="handleRank" :selected="rank">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'high')? slotProps.active: '']" valEn="high" text="Высокий" :checked="slotProps.sel.find(el => el == 'high')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'middle')? slotProps.active: '']" valEn="middle" text="Средний" :checked="slotProps.sel.find(el => el == 'middle')" />
                            <MyCheckbox :class="[slotProps.className, slotProps.sel.find(el => el == 'low')? slotProps.active: '']" valEn="low" text="Низкий" :checked="slotProps.sel.find(el => el == 'low')" />
                        </div>
                    </template>
                </MultiDropdown>
                <MyBut type="primary" @click="click">Применить</MyBut>
            </section>
            <section class="taskList-list">
                <TaskListItem v-for="(el, index) in getTasks.data" :index="index" :task="el" :key="el.id" />
            </section>
            <MyPaging v-if="getTasks.total" v-on:toPage="toPage" v-on:nextPage="pageUp" v-on:prevPage="pageDn" :page="paging.page" :total="getTasks.total" />
        </main>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            task: {
                assigned: "Алексей",
                user: "Максим",
                typeRu: "Задача",
                typeEn: "task",
                rankRu: "Средний",
                rankEn: "medium",
                status: "opened",
                dateOfCreation: "01.01.2022",
                dateOfUpdate: "01.05.2022",
                timeInMinutes: 30,
                title: "Настроить прокси",
                desc: "Задачка",
                comments: ["ok", "go"]
            },
            paging: {
                page: 0,
            },
            name: "",
            type: [],
            user: [],
            status: [],
            rank: []
        };
    },
    methods: {
        ...mapActions(["setActiveTab", "setFilters", "fetchAllTasks", "fetchTasks", "fetchAllUsers"]),
        pageUp() {
            this.paging.page = this.paging.page + 1;
        },
        pageDn() {
            this.paging.page = this.paging.page - 1;
        },
        toPage(p) {
            this.paging.page = p;
        },
        changeName(evt) {
            this.name = evt.target.value;
        },
        handleType(val) {
            console.log(val);
            this.type = val;
        },
        handleUser(val) {
            this.user = val;
        },
        handleStatus(val) {
            this.status = val;
        },
        handleRank(val) {
            this.rank = val;
        },
        click() {
            this.fetchTasks({ filter: {
                    query: this.name,
                    assignedUsers: this.user,
                    type: this.type,
                    status: this.status,
                    rank: this.rank
                }, page: this.curPage });
            console.log(this.getTasks);
        },
    },
    computed: {
        ...mapGetters(["isAuth", "activeTab", "filters", "getCurrentFilters", "getTasks", "getAllUsers"]),
        curPage() {
            return this.paging.page;
        }
    },
    mounted() {
        if(!this.isAuth) this.$router.push({name: 'auth'})
        this.fetchAllTasks();
        this.fetchAllUsers();
        this.fetchTasks({ filter: {
            query: this.name,
            assignedUsers: this.user,
            type: this.type,
            status: this.status,
            rank: this.rank
        }, page: this.curPage });
        this.setActiveTab(this.$route.fullPath);
        this.name = this.filters[this.activeTab]["taskName"];
        this.type = this.filters[this.activeTab]["type"];
        this.user = this.filters[this.activeTab]["user"];
        this.status = this.filters[this.activeTab]["status"];
        this.rank = this.filters[this.activeTab]["rank"];
        this.paging.page = this.filters[this.activeTab]["pagingPage"];
    },
    watch: {
        name(val) {
            this.setFilters({ filter: "taskName", value: val });
            console.log(this.name);
        },
        type(val) {
            this.setFilters({ filter: "type", value: val });
        },
        user(val) {
            this.setFilters({ filter: "user", value: val });
        },
        status(val) {
            this.setFilters({ filter: "status", value: val });
        },
        rank(val) {
            this.setFilters({ filter: "rank", value: val });
        },
        curPage(val) {
            this.setFilters({ filter: "pagingPage", value: val });
            this.fetchTasks({ filter: {
                query: this.name,
                assignedUsers: this.user,
                type: this.type,
                status: this.status,
                rank: this.rank
            }, page: this.curPage });
        }
    },
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