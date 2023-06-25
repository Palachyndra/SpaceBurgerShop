import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, WS_PROFILE_START } from '../../constants/ws';
import { TwsDataOrders } from '../../types/generalTypes';
import { TWS } from '../actions/ws';

type TWSState = {
    wsConnected: boolean;
    messages: {
        success: boolean;
        orders: TwsDataOrders;
        total: number;
        totalToday: number;
    };
    error?: Event;
};

export const initialState: TWSState = {
    wsConnected: false,
    messages: {
        success: false,
        orders: {
            createdAt: '',
            ingredients: [],
            name: '',
            number: 0,
            status: '',
            updateAt: '',
            _id: ''
        },
        total: 0,
        totalToday: 0,
    },
};

export const wsReducer = (state = initialState, action: TWS): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                error: undefined,
                wsConnected: true,
            };
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
            };
        }
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
            };
        case WS_GET_MESSAGE: {
            console.log(action.payload)
            return {
                ...state,
                error: undefined,
                messages: {
                    success: action.payload.success,
                    orders: action.payload.orders,
                    total: action.payload.total,
                    totalToday: action.payload.totalToday,
                },
            };
        }
        
        default: {
            return state;
        }
    }
};
