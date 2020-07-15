<template>
    <div>
        <video-player :options="videoOptions"/>
    </div>
</template>
<script>
import VideoPlayer from "./VideoPlayer";

export default {
    components: {
        VideoPlayer
    },
    data() {
        return {
            videoOptions: {
                autoplay: 'muted',//自动播放
                controls: true,//用户可以与之交互的控件
                loop:true,//视频一结束就重新开始
                muted:false,//默认情况下将使所有音频静音
                aspectRatio:"16:9",//显示比率
                fullscreen:{
                    options: {navigationUI: 'hide'}
                },
                sources: [
                    {
                        src: require("@/assets/video/index/oceans.mp4"),
                        type: "video/mp4"
                    }
                ]
            }
        };
    }
}

</script>
<style scoped>

</style>