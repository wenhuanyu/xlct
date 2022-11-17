<!--DARTS-->
<template>
    <GamePlayer :frames="frames" ref="player"></GamePlayer>
</template>

<script>

import GamePlayer from "../components/GamePlayer";

export default {
    name      : 'game_38',
    components: {GamePlayer},
    data() {
        return {
            frames: [],
            player: null
        };
    },

    mounted() {
        let frames = [];
        for (let i = 0; i <= 199; i++) {
            if (i < 9) {
                // frames.push(require('../assets/games/38/' + 'DARTS00' + (i + 1) + '.jpg'));
            } else if (i < 99 && i >= 9){
                // frames.push(require('../assets/games/38/' + 'DARTS0' + (i + 1) + '.jpg'));
            } else if (i < 999 && i>=99){
                // frames.push(require('../assets/games/38/' + 'DARTS' + (i + 1) + '.jpg'));
            }
        }

        this.frames = frames;
        this.player = this.$refs.player.setTarget(this);
    }
};
</script>
