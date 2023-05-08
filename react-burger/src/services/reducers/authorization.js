import { GET_TOKEN, GET_AUTH, EXIT_AUTH } from '../actions/authorization';
import { authorization, authorizationName, authorizationEmail, authorizationPassword, refreshToken, accessToken } from '../initialData';

const authorizationData = {
    authorizationName,
    authorizationEmail,
    authorizationPassword,
    accessToken,
    refreshToken,
    authorization,
};

export const authReducer = (state = authorizationData, action) => {
    switch (action.type) {
        case GET_TOKEN: {
            return {
                ...state,
                accessToken: action.payload.res.accessToken,
                refreshToken: action.payload.res.refreshToken,
                authorizationPassword: action.payload.passwordValue,
            };
        }
        case GET_AUTH: {
            return {
                ...state,
                authorizationName: action.payload.user.name,
                authorizationEmail: action.payload.user.email,
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
