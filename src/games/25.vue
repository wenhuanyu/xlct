<template>
    <div class="game padding-30 flex">
        <div class="flex-self-center flex-grow1">
            <div class="game-title size-28 text-center text-bold">呼吸协调训练</div>
            <div class="space-40"></div>
            <div class="game-content">
                <div class="top flex">
                    <div class="flex-grow1 width-0">
                        <div>
                            <img src="../assets/images/pinkB1.png" />
                        </div>
                    </div>
                    <div class="flex-grow1 width-0">
                        <div>
                            <img src="../assets/images/pinkB1.png" />
                        </div>
                    </div>
                    <div class="flex-grow1 width-0">
                        <div>
                            <img src="../assets/images/pinkB1.png" />
                        </div>
                    </div>
                    <div class="flex-grow1 width-0">
                        <div>
                            <img src="../assets/images/pinkB1.png" />
                        </div>
                    </div>
                </div>
                <div class="bottom flex">
                    <div class="flex-grow1 width-0">
                        <div>
                            <img src="../assets/images/pinkB.png" />
                        </div>
                    </div>
                    <div class="flex-grow1 width-0">
                        <div>
                            <img src="../assets/images/pinkB.png" />
                        </div>
                    </div>
                    <div class="flex-grow1 width-0">
                        <div>
                            <img src="../assets/images/pinkB.png" />
                        </div>
                    </div>
                    <div class="flex-grow1 width-0">
                        <div>
                            <img src="../assets/images/pinkB.png" />
                        </div>
                    </div>
                </div>

                <div class="circle" :class="started" :style="{ animationDuration: ballSpeed +'s' }"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'game_25',

    data() {
        let that = this;

        return {
            ballSpeed: 24,
            started  : '',
            player   : {
                /**
                 * 开始游戏
                 * @param {number} speed 速度，单位秒
                 */
                play: function (speed) {
                console.log("~ speed", speed)
                    that.started   = 'started';
                    that.ballSpeed = speed;
                },

                stop: function () {
                    that.started   = 'stop';
                },

                pause: function () {
                    that.started   = 'paused';
                },

                inverted: function () {
                }
            }
        }
    },

    mounted() {
        this.from = this.$route.query
        this.getInfo()
    },

    methods: {}
}
</script>

<style scoped lang="scss">
    .game {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: white;
    }

    .game-content {
        position: relative;
    }

    .top {
        > div {
            > div {
                width: 50%;
                float: left;
                position: relative;

                img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                &::after {
                    content: " ";
                    display: block;
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    background: url("../assets/images/pinkS1.png") no-repeat center bottom / 100% auto;
                }
            }
        }
    }

    .bottom {
        > div {
            > div {
                width: 50%;
                float: right;
                position: relative;

                img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                &::after {
                    content: " ";
                    display: block;
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    background: url("../assets/images/pinkS.png") no-repeat center top / 100% auto;
                }
            }
        }
    }

    .circle {
        height: 100%;
        width: calc(100% / 8);
        display: flex;
        position: absolute;
        top: 0;
        left: -12px;

        &::before {
            content: " ";
            display: block;
            width: 24px;
            height: 24px;
            border-radius: 24px;
            background: linear-gradient(180deg, #67f7d1 0%, #a6ffb5 100%);
            align-self: center;
        }

        &.started {
            animation: circle linear infinite;
        }

        &.paused {
            animation: circle linear infinite;
            animation-play-state: paused;
        }

        &.stop {
            animation: none;
        }
    }

    @keyframes circle {
        // 第一份
        0% {
            transform: translateX(0) translateY(0);
        }

        2.25% {
            transform: translateX(10%) translateY(-16.6%);
        }

        4% {
            transform: translateX(23%) translateY(-33%);
        }

        5% {
            transform: translateX(34.5%) translateY(-44%);
        }

        5.5% {
            transform: translateX(39.5%) translateY(-47%);
        }

        6% {
            transform: translateX(43%) translateY(-48.6%);
        }

        6.25% {
            transform: translateX(50%) translateY(-50%);
        }

        6.5% {
            transform: translateX(57%) translateY(-48.6%);
        }

        7% {
            transform: translateX(60.5%) translateY(-47%);
        }

        7.5% {
            transform: translateX(65.5%) translateY(-44%);
        }

        8.5% {
            transform: translateX(77%) translateY(-33%);
        }

        10.25% {
            transform: translateX(90%) translateY(-16.6%);
        }

        12.5% {
            transform: translateX(100%) translateY(0);
        }


        // 第二份
        14.75% {
            transform: translateX(110%) translateY(16.6%);
        }

        16.5% {
            transform: translateX(123%) translateY(33%);
        }

        17.5% {
            transform: translateX(134.5%) translateY(44%);
        }

        18% {
            transform: translateX(139.5%) translateY(47%);
        }

        18.5% {
            transform: translateX(143%) translateY(48.6%);
        }

        18.75% {
            transform: translateX(150%) translateY(50%);
        }

        19% {
            transform: translateX(157%) translateY(48.6%);
        }

        19.5% {
            transform: translateX(160.5%) translateY(47%);
        }

        20% {
            transform: translateX(165.5%) translateY(44%);
        }

        21% {
            transform: translateX(177%) translateY(33%);
        }

        22.75% {
            transform: translateX(190%) translateY(16.6%);
        }

        25% {
            transform: translateX(200%) translateY(0);
        }


        // 第三分
        27.25% {
            transform: translateX(210%) translateY(-16.6%);
        }

        29% {
            transform: translateX(223%) translateY(-33%);
        }

        30% {
            transform: translateX(234.5%) translateY(-44%);
        }

        30.5% {
            transform: translateX(239.5%) translateY(-47%);
        }

        31% {
            transform: translateX(243%) translateY(-48.6%);
        }

        31.25% {
            transform: translateX(250%) translateY(-50%);
        }

        31.5% {
            transform: translateX(257%) translateY(-48.6%);
        }

        32% {
            transform: translateX(260.5%) translateY(-47%);
        }

        32.5% {
            transform: translateX(265.5%) translateY(-44%);
        }

        33.5% {
            transform: translateX(277%) translateY(-33%);
        }

        35.25% {
            transform: translateX(290%) translateY(-16.6%);
        }

        37.5% {
            transform: translateX(300%) translateY(0);
        }


        // 第四份
        39.75% {
            transform: translateX(310%) translateY(16.6%);
        }

        41.5% {
            transform: translateX(323%) translateY(33%);
        }

        42.5% {
            transform: translateX(334.5%) translateY(44%);
        }

        43% {
            transform: translateX(339.5%) translateY(47%);
        }

        43.5% {
            transform: translateX(343%) translateY(48.6%);
        }

        43.75% {
            transform: translateX(350%) translateY(50%);
        }

        44% {
            transform: translateX(357%) translateY(48.6%);
        }

        44.5% {
            transform: translateX(360.5%) translateY(47%);
        }

        45% {
            transform: translateX(365.5%) translateY(44%);
        }

        46% {
            transform: translateX(377%) translateY(33%);
        }

        47.75% {
            transform: translateX(390%) translateY(16.6%);
        }

        50% {
            transform: translateX(400%) translateY(0);
        }

        // 第5份
        52.25% {
            transform: translateX(410%) translateY(-16.6%);
        }

        54% {
            transform: translateX(423%) translateY(-33%);
        }

        55% {
            transform: translateX(434.5%) translateY(-44%);
        }

        55.5% {
            transform: translateX(439.5%) translateY(-47%);
        }

        56% {
            transform: translateX(443%) translateY(-48.6%);
        }

        56.25% {
            transform: translateX(450%) translateY(-50%);
        }

        56.5% {
            transform: translateX(457%) translateY(-48.6%);
        }

        57% {
            transform: translateX(460.5%) translateY(-47%);
        }

        57.5% {
            transform: translateX(465.5%) translateY(-44%);
        }

        58.5% {
            transform: translateX(477%) translateY(-33%);
        }

        60.25% {
            transform: translateX(490%) translateY(-16.6%);
        }

        62.5% {
            transform: translateX(500%) translateY(0);
        }

        // 第6份
        64.75% {
            transform: translateX(510%) translateY(16.6%);
        }

        66.5% {
            transform: translateX(523%) translateY(33%);
        }

        67.5% {
            transform: translateX(534.5%) translateY(44%);
        }

        68% {
            transform: translateX(539.5%) translateY(47%);
        }

        68.5% {
            transform: translateX(543%) translateY(48.6%);
        }

        68.75% {
            transform: translateX(550%) translateY(50%);
        }

        69% {
            transform: translateX(557%) translateY(48.6%);
        }

        69.5% {
            transform: translateX(560.5%) translateY(47%);
        }

        70% {
            transform: translateX(565.5%) translateY(44%);
        }

        71% {
            transform: translateX(577%) translateY(33%);
        }

        72.75% {
            transform: translateX(590%) translateY(16.6%);
        }

        75% {
            transform: translateX(600%) translateY(0);
        }

        // 第7份
        77.25% {
            transform: translateX(610%) translateY(-16.6%);
        }

        79% {
            transform: translateX(623%) translateY(-33%);
        }

        80% {
            transform: translateX(634.5%) translateY(-44%);
        }

        80.5% {
            transform: translateX(639.5%) translateY(-47%);
        }

        81% {
            transform: translateX(643%) translateY(-48.6%);
        }

        81.25% {
            transform: translateX(650%) translateY(-50%);
        }

        81.5% {
            transform: translateX(657%) translateY(-48.6%);
        }

        82% {
            transform: translateX(660.5%) translateY(-47%);
        }

        82.5% {
            transform: translateX(665.5%) translateY(-44%);
        }

        83.5% {
            transform: translateX(677%) translateY(-33%);
        }

        85.25% {
            transform: translateX(690%) translateY(-16.6%);
        }

        87.5% {
            transform: translateX(700%) translateY(0);
        }


        // 第8份
        89.75% {
            transform: translateX(710%) translateY(16.6%);
        }

        91.5% {
            transform: translateX(723%) translateY(33%);
        }

        92.5% {
            transform: translateX(734.5%) translateY(44%);
        }

        93% {
            transform: translateX(739.5%) translateY(47%);
        }

        93.5% {
            transform: translateX(743%) translateY(48.6%);
        }

        93.75% {
            transform: translateX(750%) translateY(50%);
        }

        94% {
            transform: translateX(757%) translateY(48.6%);
        }

        94.5% {
            transform: translateX(760.5%) translateY(47%);
        }

        95% {
            transform: translateX(765.5%) translateY(44%);
        }

        96% {
            transform: translateX(777%) translateY(33%);
        }

        97.75% {
            transform: translateX(790%) translateY(16.6%);
        }

        100% {
            transform: translateX(800%) translateY(0);
        }
    }
</style>
