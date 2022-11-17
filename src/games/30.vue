<!---史奴比滑板-->
<template>
    <GamePlayer :frames="frames" ref="player"></GamePlayer>
</template>

<script>

import GamePlayer from "../components/GamePlayer";

export default {
    name      : 'game_30',
    components: {GamePlayer},
    data() {
        return {
            frames: [],
            player: null
        };
    },

    mounted() {
        let frames = [];
        for (let i = 0; i <= 157; i++) {
            // frames.push(require('../assets/games/30/' + (i + 1) + '.jpg'));
        }

        this.frames = frames;
        this.player = this.$refs.player.setTarget(this);
    }
};
</script>
