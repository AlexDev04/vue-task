<template>
    <div  id="root">
        <TaskHeader :mode="mode" :task="getTask" v-on:saveTask="saveTask" v-on:addTask="addTask" />
        <main v-if="id" class="taskPage">
            <section class="taskPage-left">
                <label>Исполнитель</label>
                <MyDropdown name="Исполнитель" v-on:select="handleUser" :selected="{en: getTask.assignedId, ru: task.assigned}">
                    <template #default="slotProps">
                        <div v-for="el in getAllUsers" :name="el.id" :class="[slotProps.className, {'active': slotProps.selected == el.id}]">{{el.username}}</div>
                    </template>
                </MyDropdown>
                <label>Тип запроса</label>
                <MyDropdown name="Тип" v-on:select="handleType" :selected="{ru: getTask.typeRu, en: getTask.type}">
                    <template #default="slotProps">
                        <div name="task" :class="[slotProps.className, {'active': slotProps.selected == 'task'}]">Задача</div>
                        <div name="bug" :class="[slotProps.className, {'active': slotProps.selected == 'bug'}]">Баг</div>
                    </template>
                </MyDropdown>
                <label>Приоритет</label>
                <MyDropdown name="Приоритет" v-on:select="handleRank" :selected="{ru: getTask.rankRu, en: getTask.rank}">
                    <template #default="slotProps">
                        <div name="low" :class="[slotProps.className, {'active': slotProps.selected == 'low'}]">Низкий</div>
                        <div name="medium" :class="[slotProps.className, {'active': slotProps.selected == 'medium'}]">Средний</div>
                        <div name="high" :class="[slotProps.className, {'active': slotProps.selected == 'high'}]">Высокий</div>
                    </template>
                </MyDropdown>
            </section>
            <hr />
            <section class="taskPage-center">
                <label>Название</label>
                <TextInput 
                    type="primary"
                    :val="getTask.title"
                    @input="handleName"
                >
                </TextInput>
                <label>Описание</label>
                <TextZone 
                    type="primary" 
                    :val="getTask.description"
                    @input="handleDesc"
                />
            </section>
            <section class="taskPage-right">
            </section>
        </main>
        <main v-else-if="!id" class="taskPage">
            <section class="taskPage-left">
                <label>Исполнитель</label>
                <MyDropdown name="Исполнитель" v-on:select="handleUser">
                    <template #default="slotProps">
                        <div v-for="el in getAllUsers" :name="el.id" :class="[slotProps.className, {'active': slotProps.selected == el.id}]">{{el.username}}</div>
                    </template>
                </MyDropdown>
                <label>Тип запроса</label>
                <MyDropdown name="Тип" v-on:select="handleType">
                    <template #default="slotProps">
                        <div name="task" :class="[slotProps.className, {'active': slotProps.selected == 'task'}]">Задача</div>
                        <div name="bug" :class="[slotProps.className, {'active': slotProps.selected == 'bug'}]">Баг</div>
                    </template>
                </MyDropdown>
                <label>Приоритет</label>
                <MyDropdown name="Приоритет" v-on:select="handleRank">
                    <template #default="slotProps">
                        <div name="low" :class="[slotProps.className, {'active': slotProps.selected == 'low'}]">Низкий</div>
                        <div name="medium" :class="[slotProps.className, {'active': slotProps.selected == 'medium'}]">Средний</div>
                        <div name="high" :class="[slotProps.className, {'active': slotProps.selected == 'high'}]">Высокий</div>
                    </template>
                </MyDropdown>
            </section>
            <hr />
            <section class="taskPage-center">
                <label>Название</label>
                <TextInput 
                    type="primary"
                    @input="handleName"
                >
                </TextInput>
                <label>Описание</label>
                <TextZone 
                    type="primary"
                    @input="handleDesc"
                />
            </section>
            <section class="taskPage-right">
            </section>
        </main>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';
import { api } from '@/api/api';

export default {
    data() {
        return {
            task: {
                title: '',
                description: '',
                type: '',
                rank: '',
                assignedId: ''
            }
        }
    },
    methods: {
        ...mapActions(['taskById']),
        handleName(evt) {
            evt.preventDefault();
            this.task.title = evt.target.value
            console.log(this.task.title)
        },
        handleDesc(evt) {
            evt.preventDefault();
            this.task.description = evt.target.value
            console.log(this.task.desc)
        },
        handleUser(val) {
            console.log(val)
            this.task.assignedId = val.en
        },
        handleType(val) {
            this.task.type = val.en
        },
        handleRank(val) {
            this.task.rank = val.en
        },
        addTask() {
            api.tasks.create(this.getAuthorizedUser.id, this.task.assignedId, this.task.title, this.task.description, this.task.rank, this.task.type)
        },
        saveTask() {
            api.tasks.edit(this.id, this.getTask.userId, this.task.assignedId, this.task.title, this.task.description, this.task.type, this.getTask.dateOfCreation, this.getTask.dateOfUpdate, this.getTask.timeInMinutes, this.getTask.status, this.task.rank)
        }
    },
    props: {
        id: Number,
    },
    mounted() {
        if(!this.isAuth) this.$router.push({name: 'auth'})
        if(this.id) {
            this.taskById(this.id);
            this.task = this.getTask
        }
    },
    computed: {
        ...mapGetters(['isAuth','getTask', 'getAllUsers', 'getAuthorizedUser']),
        mode() {
            if(this.id) return 'taskEdit'
            else if(!this.id) return 'taskAdd'
        }
    },
    watch: {
        getTask(val) {
            console.log(val)
            this.task = val
            this.task.assigned = this.getAllUsers.find(el => el.id == this.getTask.assignedId).username
            console.log(this.task)
        },
        getAllUsers(val) {
            console.log(val)
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../../_styles/style'

.taskPage
    display: flex
    text-align: start

    label
        margin: 0 5px
        color: $label-text
    
    &-left
        width: 25%

    &-center
        width: 50%
        margin: 0 1%
        overflow-y: auto

        input
            width: 95%

        textarea
            width: 95%
            height: 80%

    &-right
        display: flex
        flex-flow: column nowrap
        width: 25%
        margin: 0 0 0 1%

        button
            margin: 5px 0
            align-self: flex-start
</style>