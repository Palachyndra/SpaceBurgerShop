import { urlApi } from '../../utils/context.js'
import { INSTALL_DATA, ADD_ORDER_NUMBER } from './burger.js'
import { GET_AUTH, GET_TOKEN } from './authorization.js';

export const getStore = () => async (dispatch) => {
    const url = urlApi + "ingredients";
    fetch(url)
        .then((checkResponse))
        .then((res) => {
            const bun = [];
            const souce = [];
            const main = [];

            res.data.map((prop) => {
                if (prop.type === "bun") {
                    prop.count = 0;
                    bun.push(prop);
                }
                if (prop.type === "sauce") {
                    prop.count = 0;
                    souce.push(prop);
                }
                if (prop.type === "main") {
                    prop.count = 0;
                    main.push(prop);
                }
            })
            dispatch({
                type: INSTALL_DATA, payload: {
                    data: { bun, main, souce },
                    success: res.success,
                }
            });
        })
        .catch((res) => {
            console.error(`Ошибка ${res.status}`);
        });
}

export const getOrder = (urlOrders = '', ingredients = {}) => (dispatch) => {
    if (ingredients.length != 0)
        postData(urlOrders, { ingredients })
            .then((data) => {
                dispatch({ type: ADD_ORDER_NUMBER, payload: data });
            })
            .catch((res) => {
                console.error(`Ошибка ${res.status}`);
            });
}

const postData = (url = '', data = {}) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.ingredients)
    }).then((checkResponse));
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else
        return Promise.reject(`Ошибка ${res.status}`);
}

const refToken = async (dispatch) => {
    const url = urlApi + "auth/token";
    const token = getCookie('refreshToken');

    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
        })
}

export const authorization = () => async (dispatch) => {
    checkAuthorization()
        .then((res) => {
            if (res.success) {
                dispatch({
                    type: GET_AUTH,
                    payload: res
                });
            }
             else {
                refToken().then((res) => {
                    if(res.success) {
                        dispatch({
                            type: GET_TOKEN,
                            payload: res
                        });
                    }
                });
            }
        })
}

const checkAuthorization = () => {
    const url = urlApi + "auth/user";
    const token = getCookie('accessToken');

    return fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": token,
        },
    });
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function getCookieExport(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const checkResponseExport = (res) => {
    if (res.ok) {
      return res.json();
    } else
      return Promise.reject(`Ошибка ${res.status}`);
  }
