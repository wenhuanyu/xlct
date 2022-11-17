<!---七彩轮-->
<template>
    <GamePlayer :frames="frames" ref="player"></GamePlayer>
</template>

<script>

import GamePlayer from "../components/GamePlayer";

export default {
    name      : 'game_33',
    components: {GamePlayer},
    data() {
        return {
            frames: [],
            player: null
        };
    },

    mounted() {
        let frames = [];
        for (let i = 0; i <= 63; i++) {
            if (i < 9) {
                // frames.push(require('../assets/games/33/wheel00'+ (i + 1) + '.jpg'));
            } else {
                // frames.push(require('../assets/games/33/wheel0' + (i + 1) + '.jpg'));
            }
        }

        this.frames = frames;
        this.player = this.$refs.player.setTarget(this);
    }
};
</script>
