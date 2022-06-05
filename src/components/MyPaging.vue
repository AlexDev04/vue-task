<template>
    <section class="pager">
        <div class="pager-left">
            <MyBut type="default" @click="back" :dis="pageCur == 0" text="Назад" />
            <MyBut v-for="(item, index) in pagesArr" :key="index" :type="index == pageCur? 'primary': 'default'" :text="index + 1" />
            <MyBut type="default" @click="forward" :dis="pageCur == maxPageCur" text="Вперед" />
        </div>
        <div class="placeholder">
            Показано 
            {{pageCur != maxPageCur
            ?' ' + pageCur + '1' + '-' + (+ pageCur + 1) + '0' + ' '
            :' ' + pageCur + '1' + '-' + totalCur + ' '
            }}
            из {{totalCur}}
        </div>
    </section>
</template>


<script>
    export default{
        data() {
            return{
                pageCur: 0,
                maxPageCur: 0,
                totalCur: 0,
                pagesCur: 0,
                pagesArr: []
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
        mounted() {
            this.pageCur = + this.page;
            this.maxPageCur = Math.ceil(this.total / 10 - 1);
            this.totalCur = + this.total;
            this.pagesCur = Math.ceil(this.total / 10);
            this.pagesArr = [...Array(this.pagesCur)];
        },
        methods: {
            back() {
                this.pageCur = this.pageCur - 1;
                console.log(this.pageCur)
            },
            forward() {
                this.pageCur = this.pageCur + 1;
                console.log(this.pageCur)
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