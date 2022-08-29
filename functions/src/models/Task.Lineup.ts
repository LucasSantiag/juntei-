export enum TaskStatus {
  DOING = "DOING",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
}

export interface TaskLineup {
  id: string,
  taskId: string,
  status: TaskStatus,
  description: string,
  mediaUrl: string,
}

export interface ConcludeRequest {
  taskId: string,
  description: string,
  mediaUrl: string,
}

export interface UserRelationship {
  childId: string,
  taskLineup?: TaskLineup[],
}
