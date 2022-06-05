<template>
    <div>
        <p>Hello</p>
        <MultiDropdown :dis="false">
            <template #default="slotProps">
                <MyCheckbox :className="[slotProps.className, slotProps.selected.find(el => el == 'React')? slotProps.active: '']" text="React" />
                <MyCheckbox :className="[slotProps.className, slotProps.selected.find(el => el == 'Vue')? slotProps.active: '']" text="Vue" />
                <MyCheckbox :className="[slotProps.className, slotProps.selected.find(el => el == 'Angular')? slotProps.active: '']" text="Angular" />
            </template>
        </MultiDropdown>

    </div>
</template>


<script>

</script>


<style scoped>

</style>