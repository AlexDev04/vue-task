<template>
    <div id="root">
        <div class="notFound">
            <h1>Not found</h1>
            <MyBut type="error" @click="navHome">На главную</MyBut>
        </div>
    </div>
</template>


<script>
import router from '@/router'

export default {
    methods: {
        navHome() {
            console.log('nav to home')
            router.push({name: 'tasks'})
        }
    }
}

</script>


<style lang="sass" scoped>
@import '../../_styles/style'

.notFound
    display: flex
    flex-flow: column nowrap
    justify-content: space-evenly
    align-items: center
</style>