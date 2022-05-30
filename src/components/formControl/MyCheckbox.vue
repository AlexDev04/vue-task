<template>
        <div 
            :class="['checkbox', className]"
            :text="text"
            :name="valEn"
            @click="handleClick"
        >
            <input
                type="checkbox" 
                :name="valEn" 
                :checked="clicked"
            />
            <label :htmlFor="text" :name="valEn">{{text}}</label>
        </div>
</template>


<script>
export default {
    data() {
        return {
            clicked: false
        }
    },
    methods: {
        handleClick(e) {
            this.clicked = !this.clicked;
            console.log(e.target)
        }
    },
    props: {
        text: {
            type: String || Number,
            required: true
        },
        valEn: {
            type: String || Number,
            required: true
        },
        className: {
            type: String || Number,
            required: false
        }
    }
}
</script>


<style lang="sass">
@import '../../_styles/style'


.checkbox
    display: flex
    align-items: center


    &:hover > label::before
        border: 1px solid #7B61FF

    input
        position: absolute
        z-index: -1
        opacity: 0

        &:checked + label::before
            border: none
            background-image: url('../../_images/check.svg')

        &:checked + label
            color: $primary

        + label
            display: inline-flex
            align-items: center
            user-select: none

            &::before
                content: ''
                display: inline-block
                width: 1em
                height: 1em
                flex-shrink: 0
                flex-grow: 0
                border: 1px solid $text-color
                border-radius: 0.25em
                margin-right: 0.5em
                background-repeat: no-repeat
                background-position: center center
                background-size: 100%
</style>