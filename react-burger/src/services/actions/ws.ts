import { WS_CONNECTION_START, WS_CONNECTION_START_WITH_TOKEN, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_PROFILE_START, WS_PROFILE_CLOSED } from '../../constants/ws';
import { TWsData } from '../../types/generalTypes';

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionStartWithToken {
    readonly type: typeof WS_CONNECTION_START_WITH_TOKEN;
    readonly token: string
}


export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TWsData;
}

export interface IProfileConnectAction {
    readonly type: typeof WS_PROFILE_START;
    payload: string;
}

export const wsProfileStart = (url: string): IProfileConnectAction => {
    return {
        type: WS_PROFILE_START,
        payload: url,
    };
};

export interface IProfileClosedAction {
    readonly type: typeof WS_PROFILE_CLOSED;
}

export const wsProfileClosed = (): IProfileClosedAction => {
    return {
        type: WS_PROFILE_CLOSED,
    };
};


export type TWS =
    | IWSConnectionStart
    | IWSConnectionStartWithToken
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSGetMessage
    | IProfileConnectAction
    ;
