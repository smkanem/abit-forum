export interface ForumProgram {
  id: string
  university: string
  faculty: string
  direction: string
}

export const forumPrograms: ForumProgram[] = [
  { id: '1', university: 'МФТИ', faculty: 'ФПМИ', direction: 'Прикладная математика и информатика' },
  { id: '2', university: 'МГУ им. М.В. Ломоносова', faculty: 'Механико-математический факультет', direction: 'Математика' },
  { id: '3', university: 'МГТУ им. Н.Э. Баумана', faculty: 'Факультет ИУ', direction: 'Программная инженерия' },
  { id: '4', university: 'НИУ ВШЭ', faculty: 'Факультет компьютерных наук', direction: 'Прикладная математика и информатика' },
  { id: '5', university: 'СПбГУ', faculty: 'Математико-механический факультет', direction: 'Механика' },
  { id: '6', university: 'МГИМО', faculty: 'Факультет международных отношений', direction: 'Международные отношения' },
]
