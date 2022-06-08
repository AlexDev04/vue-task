<template>
    <div class="dropdownChb-outer">
        <div :class="[{'dropdownChb': open}, {'dropdownChb-dis': dis}]" @click="handleOpen">
            <div :class="[{'dropdownChb-label': !dis}, {'dropdownChb-label-active': (open || curSelected.length)}]">
                <p>{{name}}</p>
                <img :src="href" />
            </div>
            <div :class="['dropdownChb-content', {'hidden': !open}]" @click="handleChange">
                <slot className="dropdownChb-content-el" active="dropdownChb-content-el-active" :sel="curSelected"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: false,
            name: 'open me',
            curSelected: []
        }
    },
    props: {
        dis: {
            type: Boolean,
            required: false
        },
        className: {
            type: String,
            required: false
        },
        selected: {
            type: Array,
            required: false
        }
    },
    methods: {
        handleOpen() {
            this.open = !this.open
            console.log(this.open)
        },
        handleChange(evt) {
            const element = this.curSelected.find(el => el == evt.target.getAttribute('name'));
            if(element) {
                const index = this.curSelected.indexOf(element);
                this.curSelected.splice(index)
            }
            else if(!element) this.curSelected.push(evt.target.getAttribute('name'))
            console.log(evt.target.getAttribute('name'), this.curSelected)
            this.$emit('select', this.curSelected)
        }
    },
    computed: {
        href() {
            if(this.open) return '/_images/openedDropdown.svg';
            if(!this.open) return '/_images/closedDropdown.svg'
        }
    },
    mounted() {
        console.log(this.curSelected)
        if(this.selected) this.curSelected = this.selected
    },
    watch: {
        selected() {
            if(this.selected) this.curSelected = this.selected
        }
    }
}
</script>


<style lang="sass">
@import '../../_styles/style'

.dropdownChb
    font-family: Inter
    display: flex
    flex-flow: column nowrap
    align-items: center
    padding: 2% 0
    font-size: 14px
    border: 1px solid $primary
    z-index: 999
    background-color: $background-accent
    box-sizing: border-box
    box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5)
    border-radius: 3px
    position: absolute
    min-width: 100%
    min-height: fit-content

    &-outer
        position: relative
        height: 34px

    &-dis
        border: none
        background: $inner-shadow
        box-shadow: inset 0px 0px 2px 1px $inner-shadow
        color: $label-text
        border-radius: 3px
        padding: 5px 10px
        position: absolute

    &-label
        color: $label-text
        font-size: 14px
        cursor: pointer
        display: flex
        flex-flow: row nowrap
        justify-content: space-between
        align-items: center
        padding: 5px 10px
        background-color: #FFFFFF
        box-sizing: border-box
        box-shadow: inset 0px 0px 2px 1px $inner-shadow
        border-radius: 3px
        margin: 0 2%
        height: 24px
        position: absolute
        width: 95%

        &-active
            border: 1px solid $primary

        img
            margin-left: 10px

        p
            width: auto
    
    &-content
        width: 100%
        max-height: 60vh
        margin: 30px 0 3px
        overflow-y: auto

        &-el
            padding: 4px 5.5px
            cursor: pointer

            &-active
                color: $primary

            &:hover
                background-color: #E6E1FF
                color: $text-color
</style>