<template>
    <section v-if="isTask" name="modal-outer" :class="modal? 'modal': 'hidden'">
        <div name="modal" class="modal-window">
            <h3>Запись о работе</h3>
            <hr />
            <div class="modal-window-content">
                <p class="placeholder">Затрачено времени</p>
                <TextInput @input="handleTime" />
                <p class="placeholder">Единица измерения</p>
                <MyDropdown v-on:select="handleValue" name="Единица измерения" :selected="{ru: 'Минуты', en: 'minutes'}">
                    <template #default="slotProps">
                        <div name="minutes" :class="[slotProps.className, {'active': slotProps.selected == 'minutes'}]">Минуты</div>
                        <div name="hours" :class="[slotProps.className, {'active': slotProps.selected == 'hours'}]">Часы</div>
                        <div name="days" :class="[slotProps.className, {'active': slotProps.selected == 'days'}]">Дни</div>
                    </template>
                </MyDropdown>
                <p class="placeholder">Комментарий</p>
                <TextZone type="primary" @input="handleComment">{time.comment}</TextZone>
            </div>
            <hr />
            <div class="modal-window-footer">
                <MyBut type="primary" @click="handleAdd">Добавить</MyBut>
                <MyBut type="default" @click="handleClose">Отмена</MyBut>
            </div>
        </div>
    </section>

    <section v-else-if="isUser" name="modal-outer" :class="modal? 'modal': 'hidden'">
        <div name="modal" class="modal-window">
            <h3>Редактирование пользователя</h3>
            <hr />
            <div class="modal-window-content">
                <p class="placeholder">Имя пользователя</p>
                <TextInput :val="getAuthorizedUser.username" type="primary" @input="updateName">{user && user.username}</TextInput>
                <p class="placeholder">URL фотографии</p>
                <TextInput :val="getAuthorizedUser.photoUrl" type="primary" @input="updateUrl">{user && user.photoUrl}</TextInput>
                <p class="placeholder">О себе</p>
                <TextZone :val="getAuthorizedUser.about" type="primary" @input="updateAbout">{user && user.about}</TextZone>
            </div>
            <hr />
            <div class="modal-window-footer">
                <MyBut type="primary" @click="handleEditUser">Сохранить</MyBut>
                <MyBut type="default" @click="handleClose">Отмена</MyBut>
            </div>
        </div>
    </section>
</template>


<script>
import { api } from '@/api/api'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            time: {minutes: '', hours: '', days: '', comment: ''},
            value: 'minutes',
            user: {username: '', photoUrl: '', about: ''}
        }
    },
    methods: {
        ...mapActions(['changeModal', 'taskById', 'userById']),
        handleTime(evt) {
            console.log(evt.target.value)
            console.log(this.value)
            switch (this.value) {
                case 'minutes':
                    this.time = ({...this.time, minutes: evt.target.value});
                    break;
                case 'hours':
                    this.time = ({...this.time, hours: evt.target.value});
                    break;
                case 'days':
                    this.time = ({...this.time, days: evt.target.value})
            }
            console.log(this.time)
        },
        handleValue(val) {
            this.value = val.en
        },
        handleComment(evt) {
            this.time.comment = evt.target.value
        },
        handleAdd() {
            console.log('add')
            this.changeModal()
            console.log(this.time.minutes*1 + this.time.hours*1 * 60 + this.time.days*1 * 60 * 12);
            const total = this.time.minutes*1 + this.time.hours*1 * 60 + this.time.days*1 * 60 * 12;
            api.tasks.addWorktime(this.id, total, this.time.comment, this.getAuthorizedUser.id)
                .then(this.taskById(this.id))
        },
        handleClose() {
            this.changeModal()
        },
        updateName(evt) {
            this.user.username = evt.target.value
            console.log(this.user)
        },
        updateUrl(evt) {
            this.user.photoUrl = evt.target.value
            console.log(this.user)
        },
        updateAbout(evt) {
            this.user.about = evt.target.value
            console.log(this.user)
        },
        handleEditUser() {
            this.changeModal()
            api.users.edit(this.getAuthorizedUser.id, this.getAuthorizedUser.login, this.user.username, this.user.about, this.user.photoUrl, this.getAuthorizedUser.password)
                .then(this.userById(this.id))
        }
    },
    props: {
        modal: {
            type: Boolean,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    computed: {
        ...mapGetters(['getAuthorizedUser']),
        isTask() {
            if(this.$route.name == 'task') return true
        },
        isUser() {
            if(this.$route.name == 'user') return true
        }
    },
    watch: {
        getAuthorizedUser(val) {
            this.user = val
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../_styles/style'

.modal
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    width: 100%
    z-index: 9999
    display: flex
    justify-content: center
    align-items: center
    background: rgba(181, 181, 181, 0.35)

    &-window
        background-color: $background-accent
        border: none
        border-radius: 5px

        &-content
            padding: 0 30px

            > input, textarea, p.placeholder
                width: 100%

            > div
                width: 100%

        h3
            margin: 20px 30px
        
        &-footer
            display: flex
            justify-content: space-around

            button
                margin: 20px 5px
</style>