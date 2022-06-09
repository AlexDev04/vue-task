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
            <MyBut type="default" @click="changeStatus.act">{{changeStatus.text}}</MyBut>
            <MyBut type="primary" @click="navEdit">Редактировать</MyBut>
            <MyBut type="error" @click="del">Удалить</MyBut>
        </div>
    </section>
    <section class="taskHeader" v-else-if="mode == 'taskEdit'">
        <div>
            <h2>Редактирование</h2>
        </div>
        <div>
            <MyBut type="primary" @click="save">Сохранить</MyBut>
            <MyBut type="default" @click="navMain">Отмена</MyBut>
        </div>
    </section>
    <section class="taskHeader" v-else-if="mode == 'taskAdd'">
        <div>
            <h2>Создание</h2>
        </div>
        <div>
            <MyBut type="primary" @click="save">Сохранить</MyBut>
            <MyBut type="default" @click="navMain">Отмена</MyBut>
        </div>
    </section>
</template>

<script>
import router from '@/router'

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
                router.push({name: 'taskAdd'})
        },
        navEdit() {
            console.log('nav to edit')
            router.push({name: 'taskEdit', params: {id: this.task.id}})
        },
        navMain() {
            console.log('nav to main')
            router.push({name: 'tasks'})
        },
        del() {
            console.log('delete')
        },
        save() {
            console.log('save')
        }
    },
    mounted() {
        // console.log(this.task);
        // console.log(this.changeStatus)
    },
    computed: {
        changeStatus() {
            let text, act
            switch(this.task.status) {
                case 'opened':
                        text = 'В работу'
                        act = ''
                    break;
                case 'inProgress':
                    text = 'На тестирование'
                    act = ''
                    break;
                case 'testing':
                        text = 'Завершить'
                        act = ''
                    break;
                case 'completed':
                    text = 'Переоткрыть',
                    act = ''
                    break;
            }
            return {text: text, act: act}
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