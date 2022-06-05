<template>
    <div id="root">
        <UserHeader mode="userView" />
        <main class="userPage">
            <div class="userPage-left">
                <div class="userPage-left-img">
                    <img :src="user.userImg" />
                </div>
                <h3 class="placeholder">О себе</h3>
                <p>
                    {{user.about}}
                </p>
            </div>
            <hr />
            <div class="userPage-right">
                <h3 class="placeholder">Задачи</h3>
                <section class="userPage-right-tasks">
                    <!-- {tasks && tasks.map(el => 
                    <TaskListItem
                        className={tasks.indexOf(el) % 2 == 0 && 'userPage-right-tasks-item-grayed'}
                        type={el.type}
                        taskName={el.title}
                        status={el.status}
                        rank={el.rank}
                        id={el.id}
                    />)} -->
                </section>
                <MyPaging page="1" total="28" />
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                about: 'Some text',
                userImg: ''
            }
        }
    }
}
</script>

<style lang="sass">
@import '../../_styles/style'

.userPage
    display: flex

    hr
        margin: 0 20px

    &-left
        display: flex
        flex-flow: column nowrap
        width: 40%
        align-items: flex-start

        &-img
            display: inline-block
            border-radius: 50%
            overflow: hidden
            width: 186px
            height: 186px

        img
            width: 100%
            height: 100%
            object-fit: cover

        h3
            font-size: 16px
            margin: 20px 0 20px 0

        p
            margin: 0

    &-right
        display: flex
        flex-direction: column
        width: 60%

        &-tasks
            width: 100%
            overflow-y: auto
            @include board()

            &-item-grayed
                background-color: #F2F2F2

            .taskListItem
                justify-content: space-between

                &-type
                    width: 10%

                &-name
                    justify-content: flex-start
                    width: 25%

                &-status
                    width: 15%

                &-rank
                    width: 15%
</style>