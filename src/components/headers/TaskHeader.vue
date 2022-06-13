<template>
    <section class="taskHeader" v-if="mode == 'taskList'">
        <div>
            <h2>Задачи</h2>
        </div>
        <div>
            <MyBut type="primary" @click="navCreate">Добавить задачу</MyBut>
        </div>
    </section>
    <section class="taskHeader" v-else-if="mode == 'taskView'">
        <div>
            <h2>{{task.title}}</h2>
            <TaskStatus status={task.status} />
        </div>
        <div>
            <MyBut type="default" @click="changeStatusAct">{{changeStatus}}</MyBut>
            <MyBut type="primary" @click="navEdit">Редактировать</MyBut>
            <MyBut type="error" @click="$emit('delete')">Удалить</MyBut>
        </div>
    </section>
    <section class="taskHeader" v-else-if="mode == 'taskEdit'">
        <div>
            <h2>Редактирование</h2>
        </div>
        <div>
            <MyBut type="primary" @click="$emit('saveTask')">Сохранить</MyBut>
            <MyBut type="default" @click="navMain">Отмена</MyBut>
        </div>
    </section>
    <section class="taskHeader" v-else-if="mode == 'taskAdd'">
        <div>
            <h2>Создание</h2>
        </div>
        <div>
            <MyBut type="primary" @click="$emit('addTask')">Сохранить</MyBut>
            <MyBut type="default" @click="navMain">Отмена</MyBut>
        </div>
    </section>
</template>

<script>
import { api } from '@/api/api'

export default {
    data() {
        return {
        }
    },
    props: {
        mode: {
            type: String,
            required: true
        },
        task: {
            type: Object,
            required: true
        }
    },
    methods: {
        navCreate() {
            console.log('nav to create')
            this.$router.push({name: 'taskAdd'})
        },
        navEdit() {
            console.log('nav to edit')
            this.$router.push({name: 'taskEdit', params: {id: this.task.id}})
        },
        navMain() {
            console.log('nav to main')
            this.$router.push({name: 'tasks'})
        },
        changeStatusAct() {
            if(this.task) {
                switch(this.task.status) {
                    case 'opened':
                        api.tasks.status(this.task.id, 'inProgress')
                        break;
                    case 'inProgress':
                        api.tasks.status(this.task.id, 'testing')
                        break;
                    case 'testing':
                        api.tasks.status(this.task.id, 'complete')
                        break;
                    case 'complete':
                        api.tasks.status(this.task.id, 'opened')
                        break;
                }
            }
        }
    },
    mounted() {
        // console.log(this.task);
        // console.log(this.changeStatus)
    },
    computed: {
        changeStatus() {
            let text;
            console.log(this.task.status)
            switch(this.task.status) {
                case 'opened':
                    text = 'В работу'
                    break;
                case 'inProgress':
                    text = 'На тестирование'
                    break;
                case 'testing':
                    text = 'Завершить'
                    break;
                case 'complete':
                    text = 'Переоткрыть'
                    break;
            }
            return text
        }
    }
}
</script>

<style lang="sass" scoped>
@import '../../_styles/style'

.taskHeader
    @include header()
    
    div
        display: flex
        flex-flow: row nowrap
        justify-content: space-evenly
        align-items: center

        *
            margin: 10px
</style>