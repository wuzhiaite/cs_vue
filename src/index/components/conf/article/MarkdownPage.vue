<template>
    <div>
        <MarkdownEditor ref="markdownEditor" v-model="content2"  :height="height*0.9+'px'" />
    </div>
</template>
<script>

import {mapGetters} from 'vuex';



export default{
    data(){
        return{
            content2 : '',
        }
    },
    computed:{
        ...mapGetters({
            height:'getScreenHeight',
        })
    },
    methods:{



    }







}

</script>
<style scoped>

</style>