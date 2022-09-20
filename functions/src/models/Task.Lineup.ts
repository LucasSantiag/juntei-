export enum TaskStatus {
  TO_DO = "TO_DO",
  DONE = "DONE",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
}

export interface Week {
  start: string,
  end: string,
}

export interface TaskLineup {
  id: string,
  taskId: string,
  position: number,
  status: TaskStatus,
  description: string,
  mediaUrl: string,
}

export interface TaskRequest {
  taskId: string,
  position: number,
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
