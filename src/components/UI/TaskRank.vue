<template>
    <div :class="`rank-${rank}`">
        <img :src="rankDesc.img" />
        <p>{{rankDesc.txt}}</p>
    </div>
</template>


<script>
import low from '../../_images/low.svg';
import mid from '../../_images/mid.svg';
import high from '../../_images/high.svg';

export default {
    computed: {
        rankDesc() {
            switch (this.rank) {
                case 'low':
                    return {img: low, txt: 'Низкий'}
                case 'medium':
                    return {img: mid, txt: 'Средний'}
                case 'high':
                    return {img: high, txt: 'Высокий'}
            }
        }
    },
    props: {
        rank: {
            type: String,
            required: true
        }
    }
}
</script>


<style lang="sass" scoped>
@mixin rank($col)
    display: flex
    flex-flow: row nowrap
    align-items: center
    padding: 0px
    color: $col
    
.rank-low
    @include rank(#3CA961)

    img
        margin-right: 4px

.rank-medium
    @include rank(#E9B500)
    
    img
        margin-right: 4px
    

.rank-high
    @include rank(#D14343)

    img
        margin-right: 4px
    
</style>