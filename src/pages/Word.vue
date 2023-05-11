<script setup lang="ts">
import { onMounted } from "vue"
import Phaser from 'phaser'
import clearMap from '../assets/maps/clearMap.json'
import person1 from '../assets/images/person1.png'

const init = () => {
	const game = new Phaser.Game({
	    type: Phaser.AUTO,
	    width: 480,
	    height: 320,
	    parent: 'game',
	    physics: {
	        default: 'arcade',
	        arcade: {
	            gravity: { y: 0 },
	            debug: false
	        }
	    },
	    scene: {
	        preload: preload,
	        create: create
	    }
	});

	function preload() {
	    // 加载地图
	    this.load.tilemapTiledJSON('map', clearMap);

	    // 加载小人图像
	    // 注意：这假设你的小人图像是一种sprite sheet，并且每个小人的大小是32x32
	    // 如果不是，你需要调整这个设置以适应你的实际图片
	    this.load.spritesheet('person', person1, { frameWidth: 32, frameHeight: 32 });
	}

	function create() {
	    // 创建地图
	    let map = this.make.tilemap({ key: 'map' });
	    // 这假设你的地图中有一个名为'tiles'的tileset
	    // 如果你的tileset有不同的名称，你需要在此处更改它
	    let tiles = map.addTilesetImage('tiles');
	    // 创建图层，'Tile Layer 1'应该是你在Tiled中设置的图层名称
	    let layer = map.createLayer('Tile Layer 1', tiles, 0, 0);

	    // 创建三个小人
	    // 你可能需要根据你的地图和小人图像的实际情况调整坐标
	    let person1 = this.physics.add.sprite(100, 100, 'person');
	    let person2 = this.physics.add.sprite(200, 200, 'person');
	    let person3 = this.physics.add.sprite(300, 300, 'person');
	}

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
