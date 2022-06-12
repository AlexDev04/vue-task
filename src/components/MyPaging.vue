<template>
    <section class="pager">
        <div class="pager-left">
            <MyBut type="default" @click="$emit('prevPage')" :dis="pageCur == 0">Назад</MyBut>
            <MyBut v-for="(item, index) in pagesArr" :key="index" @click="$emit('toPage', index)" :type="index == pageCur? 'primary': 'default'">{{index + 1}}</MyBut>
            <MyBut type="default" @click="$emit('nextPage')" :dis="pageCur == maxPageCur">Вперед</MyBut>
        </div>
        <div class="placeholder">
            Показано {{range}} из {{totalCur}}
        </div>
    </section>
</template>


<script>
    export default{
        data() {
            return{
            }
        },
        props: {
            page: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        },
        computed: {
            pageCur() {return + this.page},
            maxPageCur() {return Math.ceil(this.total / 10 - 1)},
            totalCur() {return + this.total},
            pagesCur() {return Math.ceil(this.total / 10)},
            pagesArr() {return [...Array(this.pagesCur)]},
            range() {
                if(this.pageCur != this.maxPageCur) return ' ' + this.pageCur + '1' + '-' + (+ this.pageCur + 1) + '0'
                else return ' ' + this.pageCur + '1' + '-' + this.totalCur
            }
        }
    }
</script>


<style lang="sass">
.pager
    display: flex
    flex-flow: row nowrap
    align-items: center
    justify-content: space-between
    width: 100%

    &-left
        display: flex
        justify-content: flex-start

        button
            margin: 5px
            padding: 0 10px
</style>