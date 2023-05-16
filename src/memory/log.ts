export type ActionType = 'say' | 'walk'

export interface ActionBase<T extends ActionType> {
  personId: string
  logId: string
  time: string // 形如 2022-04-05 12:44:31
  summary: string // 简述
  type: T
  speaker: string // 发起人
  affected?: string[] // 受动作影响的人, 为空可能为自言自语
}



export interface ActionContent {
  summary: string // 简述
  text?: string // 正文
}

export interface SayLog extends ActionBase<'say'> {
  content: ActionContent // 执行步骤[]
}

export interface WalkLog extends ActionBase<'walk'> {
  content: ActionContent // 执行步骤[]
}

export interface IdeaType {
  type: ActionType
  content: string
}

export type Log = SayLog | WalkLog