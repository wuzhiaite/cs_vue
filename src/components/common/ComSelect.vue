<template>
    <el-select
               v-model="form[item.prop]"
               size="mini"
               filterable
               :allow-create=" item.allowCreate ? item.allowCreate : false "
               :disabled="item.disabled ? item.disabled : false"
               :multiple = " item.multiple ? item.multiple : false "
               @change=" item.events && item.events.changeSelect ? item.events.changeSelect() : null "
               :placeholder="item.placeholder ? item.placeholder : '请选择' ">
        <el-option v-if="item.options && item.options.length > 0 " v-for="opt in  item.options"
                    :label="opt.label" :value="opt.value"/>
    </el-select>
</template>
<script>
export default {
    props:{
        item :{
            required:true,
            type:Object,
        },
        form:{
            required:true,
            type:Object,
        }
    },
    created() {
        this.item
    }


}
</script>
<style scoped>

</style>




