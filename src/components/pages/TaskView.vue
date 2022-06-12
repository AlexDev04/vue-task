<template>
    <div id="root">
        <MyModal :modal="isModal" :key="curRoute" :id="id"/>
        <TaskHeader mode="taskView" :task="getTask" :key="getTask.id" v-on:delete="deleteTask" />
        <main class="taskPage">
            <section class="taskPage-left">
                <p class="placeholder">Исполнитель</p>
                <p >{{getAllUsers.find(el => el.id == getTask.assignedId).username}}</p>
                <p class="placeholder">Автор задачи</p>
                <p>{{getAllUsers.find(el => el.id == getTask.userId).username}}</p>
                <p class="placeholder">Тип запроса</p>
                <p>{{getTask.typeRu}}</p>
                <p class="placeholder">Приоритет</p>
                <p>{{getTask.rankRu}}</p>
                <p class="placeholder">Дата создания</p>
                <p>{{dateCreate}}</p>
                <p class="placeholder">Дата изменения</p>
                <p>{{dateUpdate}}</p>
                <p class="placeholder">Затрачено времени</p>
                <p>{{getTask.timeInMinutes}} минут</p>
                <MyBut type="primary"  @click="openModal">Сделать запись о работе</MyBut>
            </section>
            <hr />
            <section class="taskPage-center">
                <p class="placeholder">Описание</p>
                <p>{{getTask.description}}</p>
            </section>
            <hr />
            <section class="taskPage-right">
                <p class="placeholder">Комментарии({{getTaskComments.length}})</p>
                <TextZone placeholder="Текст комментария" type="primary" @input="changeComment"></TextZone>
                <MyBut type="success" @click="addComment">Добавить комментарий</MyBut>
                <div class="comments">
                        <div v-for="el in getTaskComments" :key="el.id" class="comments-item">
                            <div class="comments-item-header">
                                <p class="placeholder">{{
                                    getAllUsers.find(user => user.id === el.userId).username + ' (' +
                                    el.dateOfCreation + ')'
                                }}</p>
                                    <p v-if="el.userId == getAuthorizedUser.id" class="comments-item-header-del" @click="deleteCom" :id="el.id">Удалить</p>
                            </div>
                            <p>{{el.text}}</p>
                        </div>
                </div>
            </section>
        </main>
    </div>
</template>


<script>
import { api } from '@/api/api';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
    data() {
        return {
            comment: "",
            modal: false
        };
    },
    mounted() {
        if(!this.isAuth) this.$router.push({name: 'auth'})
        this.taskById(this.id);
        this.taskComments(this.id);
    },
    methods: {
        ...mapActions(["taskById", "changeModal", "taskComments"]),
        addComment() {
            api.comments.add(this.getTask.id, this.getAuthorizedUser.id, this.comment)
        },
        openModal() {
            this.changeModal()
        },
        changeComment(evt) {
            this.comment = evt.target.value;
        },
        deleteCom(evt) {
            api.comments.delete(evt.target.id)
        },
        deleteTask() {
            api.tasks.delete(this.id)
        }
    },
    props: {
        id: Number
    },
    computed: {
        ...mapGetters(["isAuth", "getTask", "isModal", "getAllUsers", "getAuthorizedUser", "getTaskComments"]),
        curRoute() {
            return this.$route.fullPath
        },
        dateCreate() {
            return moment(this.getTask.dateOfCreation).format('DD.MM.YYYY, hh:mm')
        },
        dateUpdate() {
            return moment(this.getTask.dateOfUpdate).format('DD.MM.YYYY, hh:mm')
        }
    },
    watch: {
        getTask(val) {
            console.log(val)
        },
        getTaskComments(val) {
            console.log(val)
        },
        isModal(val) {
            console.log(val)
        }
    }
}

</script>


<style scoped lang="sass">
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

.comments
    flex-grow: 1
    overflow-y: auto


    &-item
        display: flex
        flex-flow: column nowrap

        &:hover &-header-del
            display: inline

        &-header
            display: flex
            justify-content: space-between

            &-del
                display: none
                color: $error

                &:hover
                    text-decoration: underline
                    cursor: pointer
</style>