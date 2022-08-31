export enum UserType {
  PARENT = "PARENT",
  CHILD = "CHILD",
}

export enum TokenStatus {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  SUCCESS = "SUCCESS",
}

export interface Token {
  tokenId: string,
  expiresAt: number,
  status: TokenStatus
}

export interface UserRequest {
  name: string,
  avatar: string,
  position: string,
  team: string,
  role: UserType,
}

export interface User {
  name: string,
  avatar: string,
  position: string,
  team: string,
  role: UserType,
  balance: number,
  token: Token,
}
