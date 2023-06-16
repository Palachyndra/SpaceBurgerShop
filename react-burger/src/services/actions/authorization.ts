import { GET_TOKEN, GET_AUTH, EXIT_AUTH } from '../../constants/authorization';

export interface IGetToken {
    readonly type: typeof GET_TOKEN;
    readonly payload: TGetToken;
}

type TGetToken = {
    accessToken: string,
    refreshToken: string,
}

export interface IGetAuth {
    readonly type: typeof GET_AUTH;
    readonly payload: {
        user: TGetAuth,
        passwordValue: string,
        authorization: boolean
    }
}

type TGetAuth = {
        name: string,
        email: string,
}

export interface IExitAuth {
    readonly type: typeof EXIT_AUTH;
    readonly payload: TExitAuth;
}

type TExitAuth = {
    authorization: string,
}

export type TAuth =
  | IGetToken
  | IGetAuth
  | IExitAuth;
