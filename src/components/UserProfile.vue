<template>
    <div class="userProfile">
        <p>{{getAuthorizedUser.username}}</p>
        <div class="userProfile-icon">
            <img :src="getAuthorizedUser.photoUrl" />
        </div>
        <div class="userProfile-content">
            <p @click="handleUser">Посмотреть профиль</p>
            <p class="userProfile-content-out" @click="handleLogOut">Выйти из системы</p>
        </div>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
        }
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapActions(['logOut']),
        handleUser() {
            this.$router.push({name: 'user', params: { id: this.user.id }})
        },
        handleLogOut() {
            this.logOut()
            this.$router.push({name: 'auth'})
        }
    },
    mounted() {
        console.log(this.getAuthorizedUser)
    },
    computed: {
        ...mapGetters(['getAuthorizedUser'])
    }
}
</script>


<style lang="sass" scoped>
@import '../_styles/style'

.userProfile
    margin: 9px 20px
    cursor: pointer
    position: relative
    display: flex
    align-items: center

    &-icon
        margin: 0 10px
        width: 42px
        height: 42px
        display: inline-block
        border-radius: 50%
        overflow: hidden

    img
        width: 100%
        height: 100%
        object-fit: cover

    &-content
        font-size: 12px
        display: none
        flex-direction: column
        align-items: flex-start
        padding: 5px
        position: absolute
        top: 100%
        right: 10%
        background: $background-accent
        box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5)
        border-radius: 5px
        width: max-content

        &-out
            color: $error

        p:hover
            text-decoration: underline

    &:hover > &-content
        display: flex
</style>