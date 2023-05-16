import { Scene } from '@/action/scene'
import { Person } from '@/action/person'
import { gpt } from '@/api'
import { getIdeaPromote } from './utils'

export const start = (scene: Scene) => {
  const { personList } = scene
  personList?.forEach(person => {
    const newDate = new Date()
    if (newDate.getTime() - person.turnoverTime.getTime() >= 6 * 1000 && person.ideaList.length <= 2) {
      person.getIdea()
      person.turnoverTime = newDate
    }
  })
}

export const getIdea = async (person: Person) => {
  const info = person.getInfo()
  if (!info) return false
  const promote = getIdeaPromote(info)
  let reslut = await gpt(promote) || false
  try {
    return JSON.parse(`${reslut}`)
  } catch (error) {
    return false
  }
}