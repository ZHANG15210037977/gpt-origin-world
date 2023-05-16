import Phaser from 'phaser'
import { PERSON_TILED_LIST } from '@/action/constant/tiled'
import { Person } from '@/action/person'
import { start } from '@/control'

export class Scene extends Phaser.Scene {
	public personList: Person[]
	public targePerson: {
		person: Person | null
		cursors: Phaser.Types.Input.Keyboard.CursorKeys | null
	}

	constructor(config?: Phaser.Types.Scenes.SettingsConfig) {
		super(config);
		this.personList = [];
		this.targePerson = {
			person: null,
			cursors: null
		}
	}
	preload() {
		this.load.tilemapTiledJSON('map', '/src/assets/maps/map.json');
		this.load.image('tilemap', '/src/assets/mapSuorces/tilemap.png');

		PERSON_TILED_LIST.forEach(personItem => {
			if (!personItem.key) return
			this.load.spritesheet(personItem.key, personItem.url, { frameWidth: 16, frameHeight: 16 });
		})
	}

	create() {
		const cursors = this.input.keyboard?.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		}) as Phaser.Types.Input.Keyboard.CursorKeys

		let map = this.make.tilemap({ key: 'map' })
		let tiles = map.addTilesetImage('tilemap', 'tilemap')
		map.createLayer('layer1', tiles || [], 0, 0)

		this.personList.push(this.addPerson('1'))
		this.personList.push(this.addPerson('2', 200, 200, 'person2'))
		this.targePerson = {
			cursors,
			person: this.personList[0]
		}
	}

	update() {
		const person = this.targePerson?.person
		const cursors = this.targePerson?.cursors
		for (let item of this.personList) {
			item.updateNameLabelPosition();
		}
		if (!(person && cursors)) return
		// 根据键盘输入更新角色位置
		if (cursors.left.isDown) {
			this.targePerson.person?.setVelocityX(-160)
		} else if (cursors.right.isDown) {
			person.setVelocityX(160)
		} else {
			person.setVelocityX(0)
		}

		if (cursors.up.isDown) {
			person.setVelocityY(-160)
		} else if (cursors.down.isDown) {
			person.setVelocityY(160)
		} else {
			person.setVelocityY(0)
		}
		start(this)
	}

	addPerson(characterId: string, x = 300, y = 300, texture = 'person1') {
		const person = new Person({
			characterId,
			scene: this,
			x,
			y,
			texture,
		}, characterId === '1' ? { text: '去一个陌生的地方写作' } : undefined)
		Reflect.set(window, person.name, person)
		return person
	}
}