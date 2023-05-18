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
  age: 255,
  personality: ['百年白狐狸', '有尾巴', '粘人', '镇定', '开放', '包容'],
  hobbies: ['旅行', '做恶作剧', '求雨'],
  skills: ['吃', '喝', '走', '说', '交流', '撒娇'],
};

export const characterTwo: CharacterCard = {
  id: '2',
  name: '张桂军',
  gender: '男',
  age: 18,
  personality: ['细心', '耐心', '自律', '乐观', '开朗'],
  hobbies: ['看电影', '听音乐'],
  job: ['IT 工程师'],
  skills: ['吃', '喝', '走', '说', '做饭', '写代码',]
};

export const characterMap = new Map<string, CharacterCard>([
  ['1', characterOne],
  ['2', characterTwo]
]);

