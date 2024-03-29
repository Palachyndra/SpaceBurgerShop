import { GET_TOKEN, GET_AUTH, EXIT_AUTH } from '../../constants/authorization';
import { TAuth } from '../actions/authorization';
import { authorization, authorizationName, authorizationEmail, authorizationPassword, refreshToken, accessToken } from '../initialData';

const authorizationData = {
    authorizationName,
    authorizationEmail,
    authorizationPassword,
    accessToken,
    refreshToken,
    authorization,
};

export const authReducer = (state = authorizationData, action: TAuth) => {
    switch (action.type) {
        case GET_TOKEN: {
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            };
        }
        case GET_AUTH: {
            return {
                ...state,
                authorizationName: action.payload.user.name,
                authorizationEmail: action.payload.user.email,
                authorizationPassword: action.payload.passwordValue,
                authorization: true,
            };
        }
        case EXIT_AUTH: {
            return {
                ...state,
                authorization: false,
            };
        }
        default: {
            return state;
        }
    }
};
