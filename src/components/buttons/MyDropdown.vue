<template>
    <div class="dropdown-outer">
        <div :class="`${open && 'dropdown'} ${dis && 'dropdown-dis'}`" @click="handleOpen">
            <div :class="`${!dis && 'dropdown-label'} ${(open || selected.en) && 'dropdown-label-active'}`">
                <p>{{ selected.ru || name}}</p>
                <img :src="href" />
            </div>
            <div :class="`dropdown-content ${!open && 'hidden'}`" @click="handleChange">
                <slot className="dropdown-content-el" active="dropdown-content-el-active" :selected="selected.en"></slot>
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
            selected: {ru: '', en: ''}
        }
    },
    props: {
        dis: {
            type: Boolean,
            required: false
        }
    },
    methods: {
        handleOpen() {
            this.open = !this.open
            console.log(this.open)
        },
        handleChange(evt) {
            this.selected.en = evt.target.getAttribute('name');
            this.selected.ru = evt.target.innerHTML;
            console.log(this.selected)
        }
    },
    computed: {
        href() {
            if(this.open) return '/_images/openedDropdown.svg';
            if(!this.open) return '/_images/closedDropdown.svg'
        }
    }
}
</script>


<style lang="sass">
@import '../../_styles/style'

.dropdown
    font-family: Inter
    display: flex
    flex-flow: column nowrap
    align-items: center
    font-size: 14px
    border: 1px solid $primary
    z-index: 999
    background-color: $background-accent
    box-sizing: border-box
    box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5)
    border-radius: 3px
    width: 100%
    position: absolute

    &-outer
        position: relative
        height: 34px
        width: 200px

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
        margin: 5px
        height: 24px
        position: absolute
        width: 95%

        &:hover
            color: $text-color
            border: 1px solid $primary
            margin: 4px

        &-active
            color: black
            border: 1px solid $primary
            margin: 4px

        img
            margin-left: 2%
            width: 8px
            height: 6px

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
            display: flex
            justify-content: flex-start

            &:hover
                background-color: #E6E1FF
                color: $text-color
        .active
            background-color: $primary
            color: $disabled-text
</style>