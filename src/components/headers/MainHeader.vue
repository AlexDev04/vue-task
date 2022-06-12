<template>
    <header class="mainHeader">
        <img src="@/_images/Logo.svg" @click="navHome" />
        <MyNav v-if="notAuthPage" />
        <UserProfile v-if="notAuthPage" :user="user" />
    </header>
</template>


<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        navHome() {
            this.$router.push('tasks')
        }
    },
    computed: {
        notAuthPage() {
            return this.$route.fullPath != '/'
        }
    },
    mounted() {
        console.log(this.notAuthPage)
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../../_styles/style'

.mainHeader
    background-color: $background-accent
    width: 100%
    height: 10%
    display: flex
    justify-content: space-between

    > img
        margin: 20px
        width: 120px
        height: 20px
        align-self: center

        &:hover
            cursor: pointer
</style>