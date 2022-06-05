<template>
    <button :class="[className, butType]" :disabled="dis" @click="handleClick, onClick()">{{text}}</button>
</template>


<script>

export default {
    data() {
        return{
            butType: 'default'
        }
    },
    methods: {
        handleClick(e) {
            console.log(e.target)
        }
    },
    props: {
        type: {
            type: String,
            required: false
        },
        text: {
            type: String || Number,
            required: true
        },
        className: {
            type: String,
            required: false
        },
        onClick: {
            type: Function,
            required: false
        },
        dis: {
            type: Boolean,
            required: false
        }
    },
    mounted() {
        if(this.type != undefined) this.butType = this.type;
        if(this.dis) this.butType = 'disabled'

    },
    watch:{
        dis() {
            if(this.dis) this.butType = 'disabled'
            if(!this.dis) this.butType = ''
        },
        type() {
            if(this.type != undefined) this.butType = this.type;
        }
    }
}
</script>


<style lang="sass">
@import '../../_styles/style'

@mixin but()
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    padding: 0px 20px
    box-sizing: border-box
    border-radius: 5px
    height: 24px
    color: $default

.default
    @include but()
    background: $default
    border: 1px solid #333333
    color: black

    &:hover
        background: $default-hov

    &:active
        background: $default-act

.primary
    @include but()
    background: $primary
    border: 1px solid $primary

    &:hover
        background: $primary-hov

    &:active
        background: $primary-active

.success
    @include but()
    background: $success
    border: 1px solid $success

    &:hover
        background: $success-hov

    &:active
        background: $success-act

.error
    @include but()
    background: $error
    border: 1px solid $error

    &:hover
        background: $error-hov

    &:active
        background: $error-act

.disabled
    @include but()
    background: $disabled
    border: 1px solid $disabled
    color: $disabled-text
</style>