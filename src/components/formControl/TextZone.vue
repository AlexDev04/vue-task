<template>
    <textarea v-on="$listeners" :class="`textZone-${areaType}`" v-model="value"></textarea>
</template>


<script>

export default {
    data() {
        return{
            areaType: '',
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
        val: {
            type: String || Number,
            required: false
        }
    },
    mounted() {
        this.value = this.val;
        this.areaType = this.type;
        if(this.type == undefined) this.areaType = 'primary'
    }
}
</script>


<style lang="sass" scoped>
@import '../../_styles/style'

@mixin zone()
    
.textZone-error
    outline: none
    @include zone()
    @include emptyTextArea()

    &:invalid
        border: none

    &:hover
        margin: -1px
        @include textArea($error)

    &:focus
        @include redTextAreaActive()
    
    &::-webkit-input-placeholder
        color: $label-text

.textZone-success
    outline: none
    @include zone()
    @include emptyTextArea()

    &:invalid
        border: none

    &:hover
        margin: -1px
        @include textArea($success)

    &:focus
        @include greenTextAreaActive()
        
    &::-webkit-input-placeholder
        color: $label-text

.textZone-primary
    outline: none
    @include zone()
    @include emptyTextArea()

    &:invalid
        border: none

    &:hover
        margin: -1px
        @include textArea($primary)

    &:focus
        @include purpleTextAreaActive()
        
    &::-webkit-input-placeholder
        color: $label-text

.textZone-disabled
    @include zone()
    @include emptyTextArea()
    color: $label-text
    background: $disabled
    box-shadow: inset 0px 0px 2px 1px $inner-shadow
    
    &::-webkit-input-placeholder
        color: $label-text
</style>