<template>
    <div>
        <video id="video" width="500px" height="500px" autoplay="autoplay"></video>
        <canvas id="canvas" width="500px" height="500px"></canvas>
    </div>
</template>

<script>
export default {
    name: "Screenshot",
    data() {
        return {
            timer: ''
        };
    },
    computed: {},
    watch: {},
    methods: {
        photo(video, uid) {
            let canvas = document.getElementById("canvas");
            if (canvas) {
                let ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 500, 500);
                var image = new Image();
                image.src = canvas.toDataURL("image/png");
                let params = {
                    image: image.src,
                    uid: uid
                }
                this.$axios.post('term/index/setBase64Image', this.$qs.stringify(params)).then(res => {

                })
            }
        },
        clearPhoto() {
            clearInterval(this.timer);
        }
    },
    destroyed() {
        clearInterval(this.timer);
    },
    mounted() {
        var uid = this.$store.state.user.terminal.userInfo.uid;
        let video = document.getElementById("video");
        let that = this;
        // var img = '';
        let constraints = {
            video: {width: 500, height: 500},
            audio: false
        };
        let promise = navigator.mediaDevices && navigator.mediaDevices.getUserMedia(constraints);
        promise.then(function (MediaStream) {
            video.srcObject = MediaStream;
            video.play();
            that.timer = setInterval(() => {
                that.photo(video, uid);
            }, 2000);
        }).catch(function (PermissionDeniedError) {
            console.log(PermissionDeniedError);
        })
    }
}
</script>

<style scoped>

</style>
