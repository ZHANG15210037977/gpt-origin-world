import Phaser from 'phaser'
import { Person } from '@/action/person'

function calculateBubbleDimensions(config: {
  text: string, maxCharsPerLine: number, fontSize: number, lineHeight: number, padding: number
}): { width: number, height: number, text: string } {
  const { text, maxCharsPerLine, fontSize, lineHeight, padding } = config
  // Assume an average character width of 0.6 * fontSize, and line height of 1.2 * fontSize
  const charWidth = fontSize * 0.6;

  let lines = Math.ceil(text.length / maxCharsPerLine);
  let width = Math.min(text.length, maxCharsPerLine) * charWidth + padding * 2;
  let height = Math.min(lines, 3) * lineHeight + padding * 2;

  console.log('lines:', lines)
  let renderText = ''
  // If the text is more than 3 lines, truncate and add ellipsis
  if (lines >= 2) {
    renderText = text.substring(0, maxCharsPerLine * 2 - 3) + "...";
  }

  return { width, height, text: renderText };
}

export function getSayWreap(text: string, person: Person, scene: Phaser.Scene) {
  const fontSize = 12; // Font size in pixels
  const lineHeight = 16; // Line height in pixels
  const maxCharsPerLine = 8; // Maximum number of characters per line

  const { width: bubbleWidth, height: bubbleHeight, text: renderText } = calculateBubbleDimensions({
    text, maxCharsPerLine, fontSize, lineHeight, padding: 16
  });

  let bubble = scene.add.graphics({ x: person.x - bubbleWidth / 2, y: person.y - 2 - bubbleHeight - 20 }); // Adjusted the x position
  bubble.fillStyle(0xffffff, 1);
  bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
  bubble.lineStyle(1, 0x565656, 1); // Use lineStyle instead of setStrokeStyle
  bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

  let speechBubble = scene.add.text(0, 0, renderText, {
    fontSize: `${fontSize}px`,
    color: '#000',
    align: 'center',
    wordWrap: { width: bubbleWidth - fontSize * 2, useAdvancedWrap: true },
  });

  speechBubble.setPosition(bubble.x + bubbleWidth / 2 - speechBubble.width / 2, bubble.y + bubbleHeight / 2 - speechBubble.height / 2);

  return { bubble, speechBubble }
}



