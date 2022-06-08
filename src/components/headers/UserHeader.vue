<template>
        <section v-if="mode == 'userView'" class="userHeader">
            <div>
                <h2>{{user.username}}</h2>
            </div>
            <div>
                <MyBut type="default" @click="createTask" text="Добавить задачу" />
                <!-- {store.openedUser.id === store.curUser.id &&
                    <MyBut type="primary" onClick={handleOpen}>Редактировать</MyBut>
                } -->
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
export default {
    data() {
        return {
            user: {
                username: 'Alex'
            }
        }
    },
    props: {
        mode: {
            type: String,
            required: true
        }
    },
    methods: {
        createTask() {
            console.log('nav to create task')
        }
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