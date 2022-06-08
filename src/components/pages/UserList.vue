<template>
    <div id="root">
        <UserHeader mode="userList"/>
        <main class="userList">
            <section class="userList-list">
                <!-- {users && users.map(el => 
                <article 
                    key={el.id} 
                    onClick={() => handleNav(el.id)}
                    className={`${users.indexOf(el) % 2 == 0 && 'userList-list-item-grayed'} userList-list-item`}
                >
                    {el.username}
                </article>)} -->
            </section>
            <MyPaging class="userList-pager" page="2" total="30" />
        </main>
    </div>
</template>


<script>

</script>


<style scoped lang="sass">
@import '../../_styles/templates'
@import '../../_styles/vars'

.userList

    &-list
        width: 100%
        height: 90%
        @include board()
        overflow-y: scroll

        &-item
            display: flex
            align-items: center
            height: 68px
            color: #000000
            padding: 0 10px

            &-grayed
                background-color: #F2F2F2

    &-pager
        height: 10%
</style>