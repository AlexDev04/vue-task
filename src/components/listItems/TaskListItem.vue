<template>
    <article class="taskListItem">
        <div class="taskListItem-type">
            <TaskType :type="task.type" />
        </div>
        <div class="taskListItem-name" @click="handleOpen">
            <p>{{task.title}}</p>
        </div>
            <div v-if="!short" class="taskListItem-username">
                <p>{{task.assignedId}}</p>
            </div>
        <div class="taskListItem-status">
            <TaskStatus :status="task.status" />
        </div>
        <div class="taskListItem-rank">
            <TaskRank :rank="task.rank" />
        </div>
        <DropMore v-if="!short" class="taskListItem-burger" :mode="task.status" :id="task.id" />
    </article>
</template>

<script>
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
        }
    },
    methods: {
        handleOpen() {
            this.$router.push({name: 'task', params: { id: this.task.id }})
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

    &-username
        width: 15%

    &-status
        width: 10%

    &-rank
        width: 10%

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