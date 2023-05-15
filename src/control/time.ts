import { Scene } from '@/action/scene'
export const start = (scene: Scene) => {
  const { personList } = scene
  console.log('personList：', personList)
}