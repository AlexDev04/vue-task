<template>
    <section class="auth">
        <div class="auth-window">
            <h2>Авторизация</h2>
            <p class="placeholder">Логин</p>
            <TextInput type="primary" :val="login" @input="changeLogin" />
            <p class="placeholder">Пароль</p>
            <TextInput type="primary" :val="password" info="password" @input="changePassword" />
            <MyBut type="success" @click="handleAuth">Вход</MyBut>
        </div>
    </section>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['authorize']),
        handleAuth() {
            this.authorize({login: this.login, password: this.password})
        },
        changePassword(evt) {
            this.password = evt.target.value
        },
        changeLogin(evt) {
            this.login = evt.target.value
        }
    },
    computed: {
        ...mapGetters(['isAuth'])
    },
    watch: {
        isAuth() {
            if(this.isAuth) this.$router.push({name: 'tasks'})
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../../_styles/style'

.auth
    height: 100%
    display: flex
    justify-content: center
    align-items: center

    &-window
        background-color: $background-accent
        display: flex
        flex-flow: column nowrap
        padding: 30px
        width: 35vw
        box-shadow: 0px 0px 5px 3px $inner-shadow
        border-radius: 5px

        button
            margin: 30px 0 0

        p
            margin: 20px 0 5px

        h2
            font-size: 24px
            text-align: center
            margin: 0 0 10px 0

        input
            margin: 0
</style>