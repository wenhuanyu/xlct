<!--芙蓉葵盛开-->
<template>
    <GamePlayer :frames="frames" ref="player"></GamePlayer>
</template>

<script>

import GamePlayer from "../components/GamePlayer";

export default {
    name      : 'game_13',
    components: {GamePlayer},
    data() {
        return {
            frames: [],
            player: null
        };
    },

    mounted() {
        let frames = [];
        for (let i = 0; i <= 135; i++) {
            // frames.push(require('../assets/games/13/' + (i + 1) + '.jpg'));
        }

        this.frames = frames;
        this.player = this.$refs.player.setTarget(this);
    }
};
</script>
