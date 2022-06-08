<template>
    <div id="root">
        <TaskHeader mode="taskView" :task="task" />
        <main class="taskPage">
            <section class="taskPage-left">
                <p class="placeholder">Исполнитель</p>
                <p>{{task.assigned}}</p>
                <p class="placeholder">Автор задачи</p>
                <p>{{task.user}}</p>
                <p class="placeholder">Тип запроса</p>
                <p>{{task.typeRu}}</p>
                <p class="placeholder">Приоритет</p>
                <p>{{task.rankRu}}</p>
                <p class="placeholder">Дата создания</p>
                <p>{{task.dateOfCreation}}</p>
                <p class="placeholder">Дата изменения</p>
                <p>{{task.dateOfUpdate}}</p>
                <p class="placeholder">Затрачено времени</p>
                <p>{{task.timeInMinutes}} минут</p>
                <MyBut type="primary"  @click="openModal">Сделать запись о работе</MyBut>
            </section>
            <hr />
            <section class="taskPage-center">
                <p class="placeholder">Описание</p>
                <p>{{task.desc}}</p>
            </section>
            <hr />
            <section class="taskPage-right">
                <p class="placeholder">Комментарии({{task.comments.length}})</p>
                <TextZone placeholder="Текст комментария" type="primary" updateData={updateCommentText}>{commentText}</TextZone>
                <MyBut type="success" @click="addComment">Добавить комментарий</MyBut>
                <div class="comments">
                    <!-- {store.openedTask.comments.map(el => 
                        <div key={el.id} className="comments-item">
                            <div className="comments-item-header">
                                <p className="placeholder">{
                                    store.users.find(user => user.id === el.userId).username + ' (' +
                                    moment(el.dateOfCreation).format('DD.MM.YYYY, hh:mm') + ')'
                                }</p>
                                {el.userId === store.curUser.id &&
                                    <p className="comments-item-header-del" onClick={() => deleteCom(el.id)}>Удалить</p>
                                }
                            </div>

                            <p>{el.text}</p>
                        </div>
                    )} -->
                </div>
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
    mounted() {
        console.log(this.id)
    },
    methods: {
        addComment() {
            console.log('add comment')
        },
        openModal() {
            console.log('open modal')
        }
    },
    props: {
        id: Number
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