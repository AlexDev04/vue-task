<template>
    <input :placeholder="placeholder" v-on="$listeners" :class="`textInput-${inputType}`" v-model="value" :type="info">
</template>


<script>

export default {
    data() {
        return{
            inputType: '',
            value: ''
        }
    },
    methods: {
        handleChange(e) {
            console.log(e.target.value)
        }
    },
    props: {
        type: {
            type: String,
            required: false
        },
        placeholder: {
            type: String,
            required: false
        },
        val: {
            type: String || Number,
            required: false
        },
        info: {
            type: String,
            required: false
        }
    },
    mounted() {
        this.value = this.val;
        this.inputType = this.type;
        if(this.type == undefined) this.inputType = 'primary'
    },
    watch: {
        val() {
            this.value = this.val
        }
    }
}
</script>


<style lang="sass">
@import '../../_styles/style'

@mixin input()
    font-family: Inter
    height: 24px

.textInput-error
    outline: none
    @include input()
    @include emptyTextArea()
    &:invalid
        border: none

    &:hover
        @include textArea($error)

    &:focus
        @include redTextAreaActive()

    &::-webkit-input-placeholder
        color: $label-text

.textInput-success
    outline: none
    @include input()
    @include emptyTextArea()

    &:invalid
        border: none

    &:hover
        @include textArea($success)

    &:focus
        @include greenTextAreaActive()

    &::-webkit-input-placeholder
        color: $label-text

.textInput-primary
    @include input()
    outline: none
    @include emptyTextArea()

    &:invalid
        border: none

    &:hover
        @include textArea($primary)

    &:focus
        @include purpleTextAreaActive()

    
    &::-webkit-input-placeholder
        color: $label-text

.textInput-disabled
    @include input()
    @include emptyTextArea()
    color: $label-text
    background: $disabled
    box-shadow: inset 0px 0px 2px 1px $inner-shadow
    
.textInput-undefined
    background-color: red
</style>