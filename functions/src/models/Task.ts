export interface TaskRequest {
  description: string,
  icon: string,
  points: number,
}

export interface Task {
  relationshipId: string,
  description: string,
  icon: string,
  points: number,
  deleted: boolean,
}
