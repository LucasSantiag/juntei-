export interface RewardRequest {
  description: string,
  icon: string,
  quantity: number,
  price: number,
}

export interface Reward {
  relationshipId: string,
  description: string,
  icon: string,
  quantity: number,
  price: number,
  deleted: boolean,
}
