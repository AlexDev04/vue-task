<template>
    <article :class="['taskListItem', grayed]">
        <div class="taskListItem-type">
            <TaskType :type="task.type" />
        </div>
        <div :class="short? 'taskListItem-name-short': 'taskListItem-name'" @click="handleOpen">
            <p>{{task.title}}</p>
        </div>
            <div v-if="!short" class="taskListItem-username">
                <p>{{getAllUsers.find(el => el.id == task.assignedId).username}}</p>
            </div>
        <div :class="short? 'taskListItem-status-short': 'taskListItem-status'">
            <TaskStatus :status="task.status" />
        </div>
        <div :class="short? 'taskListItem-rank-short': 'taskListItem-rank'">
            <TaskRank :rank="task.rank" />
        </div>
        <DropMore v-if="!short" class="taskListItem-burger" :mode="task.status" :id="task.id" />
    </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    // data() {
    //     return {}
    // },
    props: {
        task: {
            type: Object,
            required: true
        },
        short: {
            type: Boolean,
            required: false
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        handleOpen() {
            this.$router.push({name: 'task', params: { id: this.task.id }})
        }
    },
    computed: {
        ...mapGetters(['getAllUsers']),
        grayed() {
            if(this.index % 2 == 0) return 'taskListItem-grayed'
        }
    }
}
</script>

<style lang="sass" scoped>
.taskListItem
    display: flex
    justify-content: space-between
    width: 100%
    height: 68px
    z-index: 100

    &-grayed
        background-color: #F2F2F2

    >div
        display: flex
        justify-content: center
        align-items: center

    &-type
        display: flex
        justify-content: center
        align-items: center
        width: 10%

    &-name
        width: 45%
        cursor: pointer
        overflow-y: auto

        &-short
            width: 25%
            cursor: pointer
            overflow-y: auto

    &-username
        width: 15%

    &-status
        width: 10%

        &-short
            width: 15%

    &-rank
        width: 10%

        &-short
            width: 15%

    &-burger
        width: 118.76px
        img
            width: 10px
            height: 12px

@media screen and (max-width: 1080px)

    .taskListItem
        &-type
            width: 10%

        &-name
            width: 35%

        &-username
            width: 17%

        &-status
            width: 14%

        &-rank
            width: 18%
</style>