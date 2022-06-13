<template>
        <section v-if="mode == 'userView'" class="userHeader">
            <div>
                <h2>{{user.username}}</h2>
            </div>
            <div>
                <MyBut type="default" @click="createTask">Добавить задачу</MyBut>
                <MyBut v-if="user.id == getAuthorizedUser.id" type="primary" @click="handleEdit">Редактировать</MyBut>

            </div>
        </section>
        <section v-else-if="mode == 'userList'" class="userHeader">
            <div>
                <h2>Пользоваетли</h2>
            </div>
            <div>
            </div>
        </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {};
    },
    props: {
        mode: {
            type: String,
            required: true
        },
        user: {
            type: Object,
            required: false
        }
    },
    methods: {
        ...mapActions(['changeModal']),
        createTask() {
            console.log("nav to create task");
        },
        handleEdit() {
            this.changeModal()
        }
    },
    computed: {
        ...mapGetters(['getAuthorizedUser'])
    }
}
</script>

<style lang="sass">
@import '../../_styles/style'

.userHeader
    @include header()
    
    div
        display: flex
        flex-flow: row nowrap
        justify-content: space-evenly
        align-items: center

        *
            margin: 0 10px
</style>