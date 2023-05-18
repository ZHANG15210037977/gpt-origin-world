import { Scene } from '@/action/scene'
import { Person } from '@/action/person'
import { gpt } from '@/api'
import { getIdeaPromote, getActionPromote } from './utils'

export type ActionType = 'say' | 'walk'
export interface ActionBase<T extends ActionType> {
  type: T
}
export interface Say extends ActionBase<'say'> {
  text: string // 执行步骤[]
}

export interface Walk extends ActionBase<'walk'> {
  x: number
  y: number
}

export type Action = Say | Walk

export const start = (scene: Scene) => {
  const { personList } = scene
  const envsInfo = scene.getEnvsInfo()
  personList?.forEach(person => {
    const newDate = new Date()
    if (newDate.getTime() - person.turnoverTime.getTime() >= 4 * 1000 && person.ideaList.length < 2) {
      person.getIdea()
      person.turnoverTime = newDate
    }
    if (newDate.getTime() - person.getActionTime.getTime() >= 4 * 1000 && !person.actionList[0]) {
      person.getAction(envsInfo?.personXoy)
      person.getActionTime = newDate
    }
    if (newDate.getTime() - person.actionTime.getTime() >= 3 * 1000 && person.actionList[0]) {
      person.action(person.actionList[0])
      person.actionList.shift()
      person.actionTime = newDate
    }
  })
}

export const getIdeaApi = async (person: Person) => {
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

export const getActionApi = async (params: {
  person: Person,
  personXoy: string
  idea: string
}): Promise<Action[] | false> => {
  const { person, personXoy, idea } = params
  const info = person.getInfo()
  if (!(info && idea)) return false
  const promote = getActionPromote(info, personXoy, idea)
  let reslut = await gpt(promote) || false
  try {
    return JSON.parse(`${reslut}`) as Action[]
  } catch (error) {
    return false
  }
}