<template>
        <div class="more">
            <div class="more-icon">
            </div>
            <div class="more-content">
                <div @click="handleEdit">Редактировать</div>
                <div class="more-content-delete" @lick="handleDelete">Удалить</div>
                <div v-if="isOpened" @click="handleInWork">Взять в работу</div>
                <div v-if="isInProgress" @click="handleTest">На тестирование</div>
                <div v-if="isOpened || isInProgress || isTesting" @click="handleComplete">Сделано</div>
                <div v-if="isInProgress || isTesting || isComplete" @click="handleReOpen">Переоткрыть</div>
            </div>
        </div>
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
        id: {
            type: String,
            required: true
        }
    },
    methods: {
        handleEdit(id) {
            this.$router.push({name: 'taskEdit', id: id})
        },
        handleDelete(id) {
            api.tasks.delete(id)
                .then(response => console.log(response))
        },
        handleInWork(id) {
            api.tasks.status(id, 'inProgress')
                .then(response => console.log(response))
        },
        handleTest(id) {
            api.tasks.status(id, 'testing')
                .then(response => console.log(response))
        },
        handleComplete(id) {
            api.tasks.status(id, 'complete')
                .then(response => console.log(response))
        },
        handleReOpen(id) {
            api.tasks.status(id, 'opened')
                .then(response => console.log(response))
        }
    },
    computed: {
        isOpened() {
            return this.mode == 'opened'
        },
        isInProgress() {
            return this.mode == 'inProgress'
        },
        isTesting() {
            return this.mode == 'testing'
        },
        isComplete() {
            return this.mode == 'complete'
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../_styles/style'

.more
    font-size: 12px
    position: relative

    &:hover > &-icon
        background-color: $primary
        width: 20px
        height: 20px
        border-radius: 5px
        border: none
        background-image: url('../_images/burger-open.svg')
        background-position: center center
        background-repeat: no-repeat
        background-size: 50%

    &:hover &-content
        width: max-content
        display: flex
        flex-direction: column
        align-items: flex-start
        padding: 4px 5px
        z-index: 999
        position: absolute
        right: 40%
        top: 80%
        background: #FFFFFF
        box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5)
        border-radius: 5px

    &-icon
        width: 20px
        height: 20px
        background-image: url('../_images/burger.svg')
        background-position: center center
        background-repeat: no-repeat
        background-size: 50%


    &-content
        display: none
        z-index: 999
        overflow: visible

        div:hover
            cursor: pointer
            text-decoration: underline

        &-delete
            color: $error
</style>