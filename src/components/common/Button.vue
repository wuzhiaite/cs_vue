<template>
    <span >
        <el-button  
            :size="btn.size ? btn.size : 'mini' "
            :id="btn.id ? btn.id : 0 "
            :type="btn.type ? btn.type : 'primary'" 
            :icon=" btn.icon ? btn.icon : '' " 
            :disabled="btn.disabled ? btn.disabled : false"
            @click="btn.click ? btn.click() : null"
            @hover="btn.hover ? btn.hover() : null "
            :circle="btn.style && JSON.stringify(btn.style).indexOf('circle') != -1 ? true : false"
            :plain="btn.style && JSON.stringify(btn.style).indexOf('plain') != -1  ? true : false"
            :round="btn.style && JSON.stringify(btn.style).indexOf('round') != -1  ? true : false"
            >{{btn.name}}
        </el-button>
    </span>             
</template>
<script>

 export default {
    props:{
        btn:{
            type:Object,
            required:false
        }
    },
    watch:{
        btn:{
            deep:true,
            immediate:true,
            handler(n,o){
                if(n && n.events){
                    console.log(n.events);
                    var events = n.events ;
                    var click = JSON.parse(str,function(k,v){
                            if(v.indexOf && v.indexOf('function') > -1){
                            return eval("(function(){return "+v+" })()")
                            }
                            return v;
                        });

                    
                    // var events = JSON.parse(n.events) ;
                    // this.btn.click = events.click ;
                    // this.btn.hover = events.hover ;
                }    


            }
        }
    }
 }


</script>
<style >

.el-button--mini{
    padding:4px 10px;
    font-size:12px;
    border-radius:3px;
}


</style>






























