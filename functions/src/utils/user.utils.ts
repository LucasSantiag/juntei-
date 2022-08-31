import {Token, TokenStatus, User, UserRequest, UserType} from "../models/User";
import {APIError, NotFoundError, MalformedBodyError, InvalidTokenError} from "../models/Error";

export const checkUser = (user: FirebaseFirestore.DocumentSnapshot<User>) => {
  if (!user.data()) {
    throw new NotFoundError();
  }
};

// 15 minutes
const timeToExpire = 900000;

export const checkEnumUserType = (u: string) => {
  if (!Object.values(UserType).includes(u as UserType)) {
    throw new MalformedBodyError();
  }
  return u as UserType;
};

export const getTimeToExpire = () => Date.now() + timeToExpire;

export const checkUsersByToken = (users: FirebaseFirestore.QuerySnapshot<User>) => {
  if (users.docs.length == 0) {
    throw new NotFoundError();
  }
  if (users.docs.length > 1) {
    throw new APIError("Something wrent wrong, please regenerate token again");
  }
  if (!users.docs[0].data().token || users.docs[0].data().token!.expiresAt < Date.now()) {
    throw new InvalidTokenError();
  }
};

export const mapUserList = (user: FirebaseFirestore.DocumentSnapshot<User>) => {
  return Object.assign({}, {
    "id": user.id,
    "name": user.data()?.name,
    "balance": user.data()?.balance,
  });
};

export const mapRequest = (req: UserRequest, balance = 0) => {
  return {
    name: req.name,
    avatar: req.avatar,
    position: req.position,
    team: req.team,
    role: checkEnumUserType(req.role),
    balance: balance,
  } as User;
};

export const mapToken = (token: string) => {
  return {
    tokenId: token,
    expiresAt: getTimeToExpire(),
    status: TokenStatus.PENDING,
  } as Token;
};
