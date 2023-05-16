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
  近期计划：${userInfo.plans}
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