export enum HistoryType {
  REWARD = "REWARD",
  TASK = "TASK",
}

export interface History {
  uid: string,
  type: HistoryType,
  description: string,
  price: number,
  icon: string,
  date: number,
}
