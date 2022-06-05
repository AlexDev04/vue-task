<template>
    <div id="root">
        <TaskHeader mode="taskList" />
        <main class="taskList">
            <section class="taskList-sorting">
                <MultiDropdown class="taskList-sorting-type">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'React')? slotProps.active: '']" text="React" />
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'Vue')? slotProps.active: '']" text="Vue" />
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'Angular')? slotProps.active: '']" text="Angular" />
                        </div>
                    </template>
                </MultiDropdown>
                <TextInput placeholder="Название задачи" class="taskList-sorting-name" />
                <MultiDropdown class="taskList-sorting-username">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'React')? slotProps.active: '']" text="React" />
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'Vue')? slotProps.active: '']" text="Vue" />
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'Angular')? slotProps.active: '']" text="Angular" />
                        </div>
                    </template>
                </MultiDropdown>
                <MultiDropdown class="taskList-sorting-status">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'React')? slotProps.active: '']" text="React" />
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'Vue')? slotProps.active: '']" text="Vue" />
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'Angular')? slotProps.active: '']" text="Angular" />
                        </div>
                    </template>
                </MultiDropdown>
                <MultiDropdown class="taskList-sorting-priority">
                    <template #default="slotProps">
                        <div>
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'React')? slotProps.active: '']" text="React" />
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'Vue')? slotProps.active: '']" text="Vue" />
                            <MyCheckbox :class="[slotProps.className, slotProps.selected.find(el => el == 'Angular')? slotProps.active: '']" text="Angular" />
                        </div>
                    </template>
                </MultiDropdown>
                <MyBut type="primary" @click="click" text="Применить" />
            </section>
            <section class="taskList-list">
            </section>
            <MyPaging  page="0" total="48" />
        </main>
    </div>
</template>


<script>
import TaskHeader from '../headers/TaskHeader.vue'
export default {
    methods: {
        click() { console.log("click"); }
    },
    components: { TaskHeader }
}
</script>


<style scoped lang="sass">
@import '../../_styles/style.sass'

.taskList
    display: flex
    flex-flow: column nowrap
    align-items: center
    justify-content: flex-start

    &-sorting
        width: 100%
        height: 10%
        display: flex
        justify-content: space-between

        &-type
            width: 10%

        &-name
            width: 45%

        &-username
            width: 15%

        &-status
            width: 10%

        &-priority
            width: 10%

    &-list
        width: 100%
        height: 80%
        @include board()
        overflow-y: auto

        &-item-grayed
            background-color: #F2F2F2


    &-pager
        display: flex
        align-items: center
        height: 10%

@media screen and (max-width: 1080px)

    .taskList-sorting
        &-type
            width: 10%

        &-name
            width: 35%

        &-username
            width: 17%

        &-status
            width: 14%

        &-priority
            width: 18%
</style>