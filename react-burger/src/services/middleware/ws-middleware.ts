import { Middleware, MiddlewareAPI } from "redux";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_START_WITH_TOKEN,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../../constants/ws";
import { getCookieExport } from "../actions";
import { TWS } from "../actions/ws";
import { TWsData } from "../../types/generalTypes";

export const socketMiddleware = (wsApi: string): Middleware => {

    return ((store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next) => (action: TWS) => {
            const { dispatch } = store;
            const { type } = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(`${wsApi}/all`);
            }

            if (type === WS_CONNECTION_START_WITH_TOKEN) {
                socket = new WebSocket(`${wsApi}?token=${action.token}`);
            }

            if (socket) {
                socket.onopen = (event) => {
                    dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
                };

                socket.onerror = (event) => {
                    dispatch({ type: WS_CONNECTION_ERROR, payload: event });
                };
                socket.onmessage = (event) => {
                    const { data } = event;
                    const WSData: TWsData & { message: string } = JSON.parse(data);
                    if (WSData.message === "Invalid or missing token") {
                        const refreshToken = getCookieExport("refreshToken");

                        if (refreshToken) {
                            const token = getCookieExport("accessToken");
                            socket = new WebSocket(`${wsApi}?token=${token}`);
                        }
                    }

                    dispatch({ type: WS_GET_MESSAGE, payload: WSData });
                };

                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        dispatch({ type: WS_CONNECTION_ERROR, payload: event });
                    }
                };

                if (type === WS_CONNECTION_CLOSED) {
                    socket.close(1000);
                }
            }
            next(action);
        };
    }) as Middleware;
};