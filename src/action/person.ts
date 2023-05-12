import { getSayWreap } from '@/action/utils/text'
import Phaser from 'phaser'

export interface PersonConfig {
  name: string;
  scene: Phaser.Scene;
  x: number;
  y: number;
  texture: string;
  frame?: string | number;
}

export class Person extends Phaser.Physics.Arcade.Sprite {
  public name: string // 名字
  private nameLabel: Phaser.GameObjects.Text;

  constructor(config: PersonConfig) {
    super(config.scene, config.x, config.y, config.texture, config.frame);
    this.name = config.name;
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

  moveTo(x: number, y: number, duration = 1000) {
    // TODO 先X移动 后Y移动
    this.scene.tweens.add({
      targets: this,
      x: x,
      y: y,
      ease: 'Power2',
      duration: duration,
    })
  }

  say(text: string, delay = 3000) {
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


  async sayStream(text: any, interval = 100) {
    let renderText = ''

    for (let i = 0; i < text.length; i++) {
      renderText += text[i]
      await new Promise((resolve) => setTimeout(resolve, interval))
      this.say(renderText)
    }
  }
}
