<template>
    <vue-bpmn
            url="./diagram.bpmn"
            v-on:error="handleError"
            v-on:shown="handleShown"
            v-on:loading="handleLoading">

    </vue-bpmn>
</template>

<script>
    import VueBpmn from 'vue-bpmn';

    export default {
        components: {
            VueBpmn
        },
        methods: {
            handleError: function(err) {
                // console.error('failed to show diagram', err);
                console.log(err);
            },
            handleShown: function() {
                console.log('diagram shown');
            },
            handleLoading: function() {
                console.log('diagram loading');
            }
        }
    };
</script>
<style  scoped>


</style>