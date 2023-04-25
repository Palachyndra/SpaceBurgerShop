import { urlApi } from '../../utils/context.js'
import { INSTALL_DATA, ADD_ORDER_NUMBER } from './burger.js'

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