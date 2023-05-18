import { CharacterCard } from "@/memory/character"

export const getIdeaPromote = (userInfo: CharacterCard): string => {
  return `我需要你根据 人物信息、补充要求，完成人物扮演，并按要求返回指定格式数据。
  人物信息、补充要求、返回数据格式前面会加 "###" 表示
  
  ### 人物信息:
  姓名：${userInfo.name}
  性别: ${userInfo.gender}
  年龄：${userInfo.age}
  性格：${userInfo.personality}
  爱好: ${userInfo.hobbies}
  技能：${userInfo.skills}
  附近的人：'张桂军'
  过往经历：无
  
  ### 补充要求:
  1、集合人物信息，用文字描述出扮演角色当前的一个随机想法 or 想做的事情
  2、描述尽量简洁，在12个字以内
  3、人物想和做的事情，要符合人物技能的限制
  4、请直接提供想法，不需要对人物进行详细描述
  
  ### 返回数据格式
  返回一个object，想法放在text字段下，JSON 字符串数据。
  形如 '{"text":"XXXXXX"}'`
}

export const getActionPromote = (userInfo: CharacterCard, personXoy: string, text: string): string => {
  return `请将下面的任务拆分成可执行的API序列，并以JSON格式返回结果：
  任务：${text}
  根据以下上下文进行任务拆分：
  1、可供使用的api：say（让当前人物说指定文本），walk（让当前人物移动到指定位置）。
  2、游戏地图坐标说明：地图为一个宽480米，长320米的2d地图。
  3、地图环境信息说明：
  地图人物：${personXoy}
  4、人物间相隔十米，视为远离。
  5、当没有合适可执行api时，使用say。
  6、当前人物信息：
  姓名：${userInfo.name}
  性别: ${userInfo.gender}
  年龄：${userInfo.age}
  性格：${userInfo.personality}
  爱好: ${userInfo.hobbies}
  技能：${userInfo.skills}
  7、可执行 api 入参定义：
  type ActionType = 'say' | 'walk'
  interface ActionBase<T extends ActionType> {
  type: T
  }
  interface Say extends ActionBase<'say'> {
  text: string
  }
  interface Walk extends ActionBase<'walk'> {
  x: number
  y: number
  }
  8、请直接返回可执行的JSON 格式api序列，形如：'[{"type":"walk","x":130,"y":130},{"type":"say","text":"XXXX。"}]'
  注意：不要做任何解释和说明。`
}