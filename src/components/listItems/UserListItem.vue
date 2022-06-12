<template>
    <article 
        @click="handleNav"
        :class="['userList-list-item', grayed]"
    >
        {{user.username}}
    </article>
</template>


<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        handleNav() {
            this.$router.push({name: 'user', params: { id: this.user.id }})
        }
    },
    computed: {
        grayed() {
            if(this.index % 2 == 0) return 'userList-list-item-grayed'
        }
    },
    mounted() {
        console.log('user list item')
    }
}
</script>
