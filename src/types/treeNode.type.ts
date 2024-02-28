export interface TreeNode {
  title: string
  key: string
  code?: string
  children?: TreeNode[]
  expanded?: boolean
  checked?: boolean
  selected?: boolean
  isLeaf?: boolean
  isExpanded?:boolean
  level?: number
  isChecked?: boolean
  origin?: any
  parentChecked?: boolean
}

export interface Action {
  name: string
  code: string
  value: boolean
}

export interface GroupChild {
  code: string
  name: string
  [key: string]: Action | string
}

export interface RoleGroup {
  id: number
  name: string
  code: string
  children: GroupChild[]
}