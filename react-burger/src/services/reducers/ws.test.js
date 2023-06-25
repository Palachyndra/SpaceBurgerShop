import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_PROFILE_START } from '../../constants/ws';
import { initialState, wsReducer } from './ws';

test('should return the initial state ws reducer', () => {
    expect(wsReducer(undefined, { type: undefined })).toEqual(initialState);
});

test('WS_CONNECTION_SUCCESS', () => {
    const resultState = { ...initialState, error: undefined, wsConnected: true };
    expect(wsReducer(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual(resultState);
});

test('WS_CONNECTION_ERROR', () => {
    const resultState = { ...initialState, wsConnected: false };
    expect(wsReducer(initialState, { type: WS_CONNECTION_ERROR })).toEqual(resultState);
});

test('WS_CONNECTION_CLOSED', () => {
    const resultState = { ...initialState, error: undefined, wsConnected: false, };
    expect(wsReducer(initialState, { type: WS_CONNECTION_CLOSED })).toEqual(resultState);
});

test('WS_GET_MESSAGE', () => {
    const resultState = {
        ...initialState,
        error: undefined,
        messages: {}
    };
    expect(wsReducer(initialState, { type: WS_GET_MESSAGE, payload: { resultState } })).toEqual(resultState);
});
