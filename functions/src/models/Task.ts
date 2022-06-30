export interface TaskRequest {
  description: string,
  icon: string,
}

export interface Task {
  relationshipId: string,
  description: string,
  icon: string,
  deleted: boolean,
}
