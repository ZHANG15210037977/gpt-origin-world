<script setup lang="ts">
import { onMounted } from 'vue'
import Phaser from 'phaser'
import { Scene } from '@/action/scene'

const init = () => {
  const scene = new Scene()
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 480,
    height: 320,
    parent: 'game',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
      },
    },
    scene,
  })
  console.log('game', game)
}

onMounted(() => {
  init()
})
</script>

<template>
  <div id="game"></div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
