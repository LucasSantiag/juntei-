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
  role: UserType,
}

export interface User {
  role: UserType,
  balance: number,
  token: Token,
}
