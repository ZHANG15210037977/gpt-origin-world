import { getSayWreap } from '@/action/utils/text'
import Phaser from 'phaser'
import { characterMap, CharacterCard } from '@/memory/character'
import { getIdeaApi, getActionApi, Action } from '@/control'

export interface PersonConfig {
  scene: Phaser.Scene
  x: number
  y: number
  texture: string
  frame?: string | number
  name?: string
  characterId: string
}

export interface IdeaType {
  text: string
}

export class Person extends Phaser.Physics.Arcade.Sprite {
  public name: string // 名字
  private nameLabel: Phaser.GameObjects.Text;
  private characterId: string // 人设卡
  public ideaList: IdeaType[]
  public turnoverTime: Date
  public getActionTime: Date
  public actionTime: Date
  public actionList: Action[]

  constructor(config: PersonConfig, idea?: IdeaType) {
    super(config.scene, config.x, config.y, config.texture, config.frame);

    // TODO 结合GPT 动态增加
    const info = this.getInfo(config.characterId)
    this.name = info?.name || config.name || '无名氏'
    this.characterId = config.characterId
    this.ideaList = []
    this.actionList = []
    this.turnoverTime = new Date(2020, 0, 1);
    this.actionTime = new Date(2020, 0, 1);
    this.getActionTime = new Date(2020, 0, 1);
    if (idea) {
      this.ideaList.push(idea)
    }


    this.nameLabel = config.scene.add.text(0, 0, this.name, { fontSize: '12px', color: '#000' });
    this.nameLabel.setOrigin(0.5, 1); // Center the label's origin to its position

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.updateNameLabelPosition();
  }

  updateNameLabelPosition() {
    this.nameLabel.x = this.x;
    this.nameLabel.y = this.y - this.height / 2; // Adjust the y position to be above the sprite
  }

  moveTo(x: number, y: number, duration = 2000) {
    // TODO 先X移动 后Y移动
    this.scene.tweens.add({
      targets: this,
      x: x,
      y: y,
      ease: 'Power2',
      duration: duration,
    })
  }

  say(text: string, delay = 2000) {
    if (!text || !text.trim()) return
    const { bubble, speechBubble } = getSayWreap(text, this, this.scene)
    this.scene.tweens.add({
      targets: [speechBubble, bubble],
      alpha: 0,
      delay,
      duration: 200,
      onComplete: function () {
        speechBubble.destroy()
        bubble.destroy()
      },
    });
  }

  getInfo(characterId?: string): CharacterCard | null {
    const reslut = characterMap.get(characterId || this.characterId)
    return reslut ? reslut : null
  }

  action(action: Action) {
    switch (action.type) {
      case 'say':
        this.say(action.text)
        console.log(`${this.name} say：${action.text}`)
        break
      case 'walk':
        this.moveTo(action.x, action.y)
        console.log(`${this.name} moveTo (${action.x}, ${action.y})`)
        break
    }
  }

  async sayStream(text: any, interval = 100) {
    let renderText = ''

    for (let i = 0; i < text.length; i++) {
      renderText += text[i]
      await new Promise((resolve) => setTimeout(resolve, interval))
      this.say(renderText)
    }
  }

  async getIdea() {
    const idea = await getIdeaApi(this)
    if (idea) {
      this.ideaList.push(idea)
      console.log(`${this.name} 获得了一个想法：${idea.text}`)
    }
  }

  async getAction(personXoy: string) {
    const idea = this.ideaList[0]
    if (idea) {
      const resActionList = await getActionApi({
        person: this,
        personXoy,
        idea: idea?.text
      })
      if (resActionList && resActionList instanceof Array) {
        this.actionList.push(...resActionList)
        this.ideaList.shift()
      }
    }
  }
}
