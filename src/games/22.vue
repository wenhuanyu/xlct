<!--紫色风信子-->
<template>
    <GamePlayer :frames="frames" ref="player"></GamePlayer>
</template>

<script>

import GamePlayer from "../components/GamePlayer";

export default {
    name      : 'game_22',
    components: {GamePlayer},
    data() {
        return {
            frames: [],
            player: null
        };
    },

    mounted() {
        let frames = [];
        for (let i = 0; i <= 158; i++) {
            // frames.push(require('../assets/games/22/' + (i + 1) + '.jpg'));
        }

        this.frames = frames;
        this.player = this.$refs.player.setTarget(this);
    }
};
</script>
