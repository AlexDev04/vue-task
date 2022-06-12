<template>
    <nav class="navigation">
        <router-link
            :to="{name: 'tasks'}"
            :class="['navigation-link', isTasks]"
        >
            <p>Задачи</p>
        </router-link>
        <router-link
            :to="{name: 'users'}"
            :class="['navigation-link', isUsers]"
        >
            <p>Пользователи</p>
        </router-link>
    </nav>
</template>


<script>
export default {
    computed: {
        isTasks() {
            if(this.$route.name === 'tasks' || this.$route.name === 'task' || this.$route.name === 'taskEdit' || this.$route.name === 'taskAdd') return 'navigation-link-active'
        },
        isUsers() {
            if(this.$route.name === 'users' || this.$route.name === 'user') return 'navigation-link-active'
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../../_styles/style'

.navigation
    display: flex
    align-items: center

    &-link
        display: flex
        justify-content: center
        align-items: center
        text-decoration: none
        color: $text-color
        margin: 0 10px
        height: 100%

        &-active
            margin-bottom: -2px
            border-bottom: 2px solid $primary

        &:hover
            color: $primary
</style>