import { Middleware, MiddlewareAPI } from "redux";
import { WS_CONNECTION_START_WITH_TOKEN } from "../../constants/ws";
import { getCookieExport } from "../actions";
import { TWS, TWSStoreActions, TWSStoreActionsWithToken } from "../actions/ws";
import { TWsData } from "../../types/generalTypes";
import { wsApi } from "../../utils/context";

export const socketMiddleware = (wsActions: TWSStoreActions | TWSStoreActionsWithToken): Middleware => {
    return ((store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return (next) => (action: TWS) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
            console.log(type)

            if (type === wsInit) {
                socket = new WebSocket(action.url);
            }

            if (socket) {
                socket.onopen = (event) => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = (event) => {
                    dispatch({ type: onClose, payload: event });
                };
                socket.onmessage = (event) => {
                    const { data } = event;
                    const WSData: TWsData & { message: string } = JSON.parse(data);
                    if (WSData.message === "Invalid or missing token") {
                        const refreshToken = getCookieExport("refreshToken");

                        if (refreshToken) {
                            const token = getCookieExport("accessToken");
                            dispatch({
                                type: WS_CONNECTION_START_WITH_TOKEN,
                                url: `${wsApi}?token=${token}`,
                            });
                        }
                    }

                    dispatch({ type: onMessage, payload: WSData });
                };

                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        dispatch({ type: onError, payload: event });
                    }
                };

                if (type === onClose) {
                    socket.close(1000);
                }
            }
            next(action);
        };
    }) as Middleware;
};