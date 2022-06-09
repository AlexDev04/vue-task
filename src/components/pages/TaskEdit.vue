<template>
    <div  id="root">
        <TaskHeader mode="taskEdit" :task="task" />
            <main class="taskPage">
                <section class="taskPage-left">
                    <label>Исполнитель</label>
                    <MyDropdown v-on:select="handleUser">
                        <template #default="slotProps">
                            <div name="Алексей" :class="[slotProps.className, {'active': slotProps.selected == 'Алексей'}]">Алексей</div>
                            <div name="Максим" :class="[slotProps.className, {'active': slotProps.selected == 'Максим'}]">Максим</div>
                        </template>
                    </MyDropdown>
                    <label>Тип запроса</label>
                    <MyDropdown>
                        <template #default="slotProps">
                            <div name="task" :class="[slotProps.className, {'active': slotProps.selected == 'task'}]">Задача</div>
                            <div name="bug" :class="[slotProps.className, {'active': slotProps.selected == 'bug'}]">Баг</div>
                        </template>

                    </MyDropdown>
                    <label>Приоритет</label>
                    <MyDropdown>
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
                        :val="task.title"
                        @input="handleName"
                    >
                    </TextInput>
                    <label>Описание</label>
                    <TextZone 
                        type="primary" 
                        :val="task.description"
                        @input="handleDesc"
                    />
                </section>
                <section class="taskPage-right">
                </section>
            </main>
    </div>
</template>


<script>
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
            }
        }
    },
    methods: {
        handleName(evt) {
            evt.preventDefault();
            this.task.title = evt.target.value
            console.log(this.task.title)
        },
        handleDesc(evt) {
            evt.preventDefault();
            this.task.desc = evt.target.value
            console.log(this.task.desc)
        },
        handleUser(val) {
            console.log(val)
            this.task.assigned = val
        }
    },
    props: {
        id: Number
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

// .comments
//     flex-grow: 1
//     overflow-y: auto


//     &-item
//         display: flex
//         flex-flow: column nowrap

//         &:hover &-header-del
//             display: inline

//         &-header
//             display: flex
//             justify-content: space-between

//             &-del
//                 display: none
//                 color: $error

//                 &:hover
//                     text-decoration: underline
//                     cursor: pointer
</style>