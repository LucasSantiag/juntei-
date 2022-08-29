export interface TaskRequest {
  description: string,
  icon: string,
  price: number,
}

export interface Task {
  relationshipId: string,
  description: string,
  icon: string,
  price: number,
  deleted: boolean,
}
