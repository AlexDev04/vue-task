<template>
    <div :class="`status-${col}`">
        {{text}}
    </div>
</template>


<script>
export default {
    computed: {
        col() {
            if(!this.status || this.status === 'opened') {
                return 'default';
            }
            else if(this.status === 'inProgress') {
                return 'yellow';
            }
            else if (this.status === 'testing') {
                return 'yellow';
            } 
            else if(this.status === 'complete') {
                return 'green';
            }
            else if(this.status === 'error') {
                return 'red';
            }
        },
        text() {
            if(!this.status || this.status === 'opened') {
                return 'Открыто';
            }
            else if(this.status === 'inProgress') {
                return 'В работе';
            }
            else if (this.status === 'testing') {
                return 'Тестируется';
            } 
            else if(this.status === 'complete') {
                return 'Сделано';
            }
            else if(this.status === 'error') {
                return 'Не сделано';
            }
        }
    },
    props: {
        status: {
            type: String,
            required: true
        }
    }
}
</script>


<style lang="sass" scoped>
@import '../../_styles/style'

@mixin status($bgCol, $col)
    font-size: 14px
    width: 78px
    height: 20px
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center
    padding: 2px 10px
    box-sizing: border-box
    border-radius: 5px
    background-color: $bgCol
    border: 1px solid $col
    color: $col
    
.status-red
    @include status(#EB4F4F, #6D1313)
    

.status-yellow
    @include status(#FFC700,#846F00)

.status-green
    @include status(#4BD379 , #157536)

.status-default
    @include status($label-text, $text-color)
    
</style>