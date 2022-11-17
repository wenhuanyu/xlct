<!--WaterLily-->
<template>
    <GamePlayer :frames="frames" ref="player"></GamePlayer>
</template>

<script>

import GamePlayer from "../components/GamePlayer";

export default {
    name      : 'game_41',
    components: {GamePlayer},
    data() {
        return {
            frames: [],
            player: null
        };
    },

    mounted() {
        let frames = [];
        for (let i = 0; i <= 100; i++) {
            if (i <= 9) {
                // frames.push(require('../assets/games/41/' + 'lily000' + (i) + '.jpg'));
            } else if (i <= 99 && i > 9){
                // frames.push(require('../assets/games/41/' + 'lily00' + (i) + '.jpg'));
            } else if (i <= 999 && i> 99){
                // frames.push(require('../assets/games/41/' + 'lily0' + (i) + '.jpg'));
            }
        }

        this.frames = frames;
        this.player = this.$refs.player.setTarget(this);
    }
};
</script>
