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

export interface ExtractResponse {
  type: 'AnimationResponse'
  result: ExtractItem[]
}

export interface ExtractItem {
  animationName: string
  imageStr: string
}
