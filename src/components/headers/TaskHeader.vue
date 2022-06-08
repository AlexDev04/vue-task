<template>
    <section class="taskHeader" v-if="mode == 'taskList'">
        <div>
            <h2>Задачи</h2>
        </div>
        <div>
            <MyBut type="primary" @click="navCreate" text="Добавить задачу" />
        </div>
    </section>
    <section class="taskHeader" v-else-if="mode == 'taskView'">
        <div>
            <h2>{{task.title}}</h2>
            <TaskStatus status={task.status} />
        </div>
        <div>
            <MyBut type="default" @click="handleChangeStatus" :text="task.changeStatusText" />
            <MyBut type="primary" @click="navEdit" text="Редактировать" />
            <MyBut type="error" @click="del" text="Удалить" />
        </div>
    </section>
    <section class="taskHeader" v-else-if="mode == 'taskEdit'">
        <div>
            <h2>Редактирование</h2>
        </div>
        <div>
            <MyBut type="primary" @click="save" text="Сохранить" />
            <MyBut type="default" @click="navMain" text="Отмена" />
        </div>
    </section>
    <section class="taskHeader" v-else-if="mode == 'taskAdd'">
        <div>
            <h2>Создание</h2>
        </div>
        <div>
            <MyBut type="primary" @click="save" text="Сохранить" />
            <MyBut type="default" @click="navMain" text="Отмена" />
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
                router.push('/taskAdd')
        },
        navEdit() {
            console.log('nav to edit')
            router.push(`taskEdit/${task.id}`)
        },
        navMain() {
            console.log('nav to main')
        },
        del() {
            console.log('delete')
        },
        save() {
            console.log('save')
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