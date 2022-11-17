<!--EGGS-->
<template>
    <GamePlayer :frames="frames" ref="player"></GamePlayer>
</template>

<script>

import GamePlayer from "../components/GamePlayer";

export default {
    name      : 'game_39',
    components: {GamePlayer},
    data() {
        return {
            frames: [],
            player: null
        };
    },

    mounted() {
        let frames = [];
        for (let i = 0; i <= 49; i++) {
            if (i < 9) {
                // frames.push(require('../assets/games/39/' + 'EGGS000' + (i + 1) + '.jpg'));
            } else if (i < 99 && i >= 9){
                // frames.push(require('../assets/games/39/' + 'EGGS00' + (i + 1) + '.jpg'));
            } else if (i < 999 && i>=99){
                // frames.push(require('../assets/games/39/' + 'EGGS0' + (i + 1) + '.jpg'));
            }
        }

        this.frames = frames;
        this.player = this.$refs.player.setTarget(this);
    }
};
</script>
