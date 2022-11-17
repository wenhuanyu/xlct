<!---彩色钢管-->
<template>
    <GamePlayer :frames="frames" ref="player"></GamePlayer>
</template>

<script>

import GamePlayer from "../components/GamePlayer";

export default {
    name      : 'game_34',
    components: {GamePlayer},
    data() {
        return {
            frames: [],
            player: null
        };
    },

    mounted() {
        let frames = [];
        for (let i = 0; i <= 69; i++) {
            if (i < 9) {
                // frames.push(require('../assets/games/34/' + 'TUBES00' + (i + 1) + '.jpg'));
            } else {
                // frames.push(require('../assets/games/34/' + 'TUBES0' + (i + 1) + '.jpg'));
            }
        }

        this.frames = frames;
        this.player = this.$refs.player.setTarget(this);
    }
};
</script>
