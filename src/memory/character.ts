export interface CharacterCard {
  id: string
  name: string
  gender: string
  age: number
  personality: string[]
  hobbies: string[]
  plans?: string[]
  job?: string[]
  skills?: string[]
}



export const characterOne: CharacterCard = {
  id: '1',
  name: '徐鑫',
  gender: '女',
  age: 25,
  personality: ['自信', '独立', '冷静', '镇定', '开放', '包容'],
  hobbies: ['独自旅行', '阅读', '写作'],
  skills: ['吃', '喝', '走', '说', '交流', '写作'],
  plans: ['成为一名作家', '探索新的地方和文化']
};

export const characterTwo: CharacterCard = {
  id: '2',
  name: '张桂军',
  gender: '男',
  age: 28,
  personality: ['细心', '耐心', '自律', '乐观', '开朗'],
  hobbies: ['打篮球', '看电影', '听音乐'],
  plans: ['提升技术能力', '学习新技术', '参加技术交流会'],
  job: ['IT 工程师'],
  skills: ['吃', '喝', '走', '说', '做饭', '写代码',]
};

export const characterMap = new Map<string, CharacterCard>([
  ['1', characterOne],
  ['2', characterTwo]
]);

