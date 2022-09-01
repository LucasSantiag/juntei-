export enum TaskStatus {
  TO_DO = "TO_DO",
  DONE = "DONE",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
}

export interface Week {
  start: Date,
  end: Date,
}

export interface TaskLineup {
  id: string,
  taskId: string,
  status: TaskStatus,
  description: string,
  mediaUrl: string,
}

export interface TaskRequest {
  taskId: string,
}

export interface ConcludeRequest {
  taskId: string,
  description: string,
  mediaUrl: string,
}

export interface TaskLineupRequest {
  taskLineup?: TaskRequest[],
}

export interface TaskLineupRelation {
  childId: string,
  week: Week,
  taskLineup?: TaskLineup[],
}
