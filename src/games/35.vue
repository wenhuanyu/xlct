<!--兔子拾萝卜-->
<template>
    <GamePlayer :frames="frames" ref="player"></GamePlayer>
</template>

<script>

import GamePlayer from "../components/GamePlayer";

export default {
    name      : 'game_35',
    components: {GamePlayer},
    data() {
        return {
            frames: [],
            player: null
        };
    },

    mounted() {
        let frames = [];
        for (let i = 0; i <= 236; i++) {
            if (i < 9) {
                // frames.push(require('../assets/games/35/' + 'rabbit000' + (i + 1) + '.jpg'));
            } else if (i < 99 && i >= 9){
                // frames.push(require('../assets/games/35/' + 'rabbit00' + (i + 1) + '.jpg'));
            } else if (i < 999 && i>=99){
                // frames.push(require('../assets/games/35/' + 'rabbit0' + (i + 1) + '.jpg'));
            }
        }

        this.frames = frames;
        this.player = this.$refs.player.setTarget(this);
    }
};
</script>
