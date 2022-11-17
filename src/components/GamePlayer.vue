<template>
    <div>
        <div ref="content" class="content"></div>
    </div>
</template>

<script>
import vFramePlayer from "../plugs/vframeplayer";

export default {
    name : 'game-player',
    props: {
        frames: Array
    },
    data() {
        return {
            framePlayer  : null,
            start        : 0,
            end          : 0,
            current      : 0,
            invertedState: false,
            target       : null
        };
    },
    watch: {
        frames: {
            handler: function () {
                if (this.frames.length > 0) {
                    this.init();
                }
            },
            deep   : true
        }
    },

    methods: {
        init() {
            this.start         = 0;
            this.end           = this.frames.length;
            this.current       = 0;
            this.invertedState = false;
            this.framePlayer   = new vFramePlayer({
                dom      : this.$refs.content,
                imgArr   : this.frames || [],
                loop     : 1,
                yoyo     : true,
                useCanvas: true
            });


            // 动画播放停止，则清理当前贞
            this.framePlayer.on('stop', () => {
                this.current       = 0;
                this.invertedState = false;
            });

            // 动画播放中，则记录当前贞
            this.framePlayer.on('update', (frame, times, asc) => {
                this.invertedState = asc === false;
                if (this.invertedState) {
                    if (frame <= 1) {
                        this.framePlayer.stop();
                        this.onComplete();
                    }
                }

                this.current = frame;
            });

            // 播放第一帧做为封面
            this.isFirst = true;
            this.framePlayer.play(0, 1);
        },

        /**
         * 正放
         */
        play() {
            let that = this;
            this.framePlayer.pause();
            that.framePlayer.play(that.current, that.end, {
                onComplete() {
                    that.onComplete();
                }
            });

            that.target.$emit('onPlay');
        },

        /**
         * 倒放
         */
        inverted() {
            let that = this;
            this.framePlayer.pause();
            that.framePlayer.play(that.current, that.start, {
                onComplete() {
                    that.onComplete();
                }
            });

            that.target.$emit('onInverted');
        },

        /**
         * 停止播放
         */
        stop() {
            this.framePlayer.stop();
            this.target.$emit('onStop');
        },

        /**
         * 暂停播放
         */
        pause() {
            this.framePlayer.pause();
            this.target.$emit('onPause');
        },


        /**
         * 播放完成
         */
        onComplete() {
            this.target.$emit('onComplete');
        },

        /**
         * 是否倒放
         * @returns {boolean}
         */
        isInverted() {
            return this.invertedState;
        },

        /**
         * 设置触发器
         * @param target
         */
        setTarget(target) {
            this.target = target;

            return this;
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
