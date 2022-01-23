export interface IdItem {
  name: string
  ids: string[]
}

export interface IdsResponse {
  type: 'IdsResponse'
  result: IdItem[]
}

export interface NameItem {
  id: string
  name: string
}

export interface NameResponse {
  type: 'NameResponse'
  result: NameItem
}

export interface AnimationsResponse {
  type: 'AnimationResponse'
  result: AnimationItem[]
}

export interface AnimationItem {
  animationName: string
  imageStr: string
}
