export type LogType = 'action' | 'idea'

export interface LogBase<T extends LogType> {
  type: T // 消息类型
  personId: string
  logId: string
  time: string // 形如 2022-04-05 12:44:31
  content?: any // 正文
  summary: string // 简述
}

export interface ActionContent {
  summary: string // 简述
  text?: string // 正文
}

export interface ActionLog extends LogBase<'action'> { // 某一种行为的记录
  actionType: 'say' | 'walk'
  speaker: string // 发起人
  affected?: string[] // 受动作影响的人, 为空可能为自言自语
  content: ActionContent // 执行步骤[]
}

export interface IdeaLog extends LogBase<'idea'> { } // 某一个想法的记录


export type Log = ActionLog | IdeaLog