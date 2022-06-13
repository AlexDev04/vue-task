<template>
    <div class="square" v-bind:style="{backgroundColor: col}">
        <div class="square-circle"></div>
    </div>
</template>

<script>
export default {
    computed: {
        col() {
            if(this.type === 'task') return '#00D1FF';
            else if(this.type === 'bug') return '#EB4F4F';
        }
    },
    props: {
        type: {
            type: String,
            required: true
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../../_styles/style'

.square
    width: 24px
    height: 24px
    border-radius: 5px
    display: flex
    justify-content: center
    align-items: center

    &-circle
        background-color: white
        height: 12px
        width: 12px
        border-radius: 100%
</style>