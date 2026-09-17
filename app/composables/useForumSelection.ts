export interface ForumSelection {
  university: string
  faculty: string
  direction: string
}

function defaultForumSelection(): ForumSelection {
  return {
    university: 'МФТИ',
    faculty: 'ФПМИ',
    direction: 'Прикладная математика и информатика',
  }
}

export function useForumSelection() {
  return useState<ForumSelection>('forum-selection', defaultForumSelection)
}
