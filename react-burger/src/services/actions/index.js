import { urlApi } from '../../utils/context.js'
import { ingredientType } from '../../utils/types.js';
import { INSTALL_DATA, ADD_ORDER_NUMBER } from './burger.js'


export const getStore = () => async (dispatch) => {
    const url = urlApi + "ingredients";
    fetch(url)
        .then((res) => {
            // checkResponse(res) - описал проблему ниже
            if (res.ok) {
                return res.json();
            } else
                return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((data) => {
            // console.log(data)
            const bun = [];
            const souce = [];
            const main = [];

            data.data.map((prop) => {
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
                    success: data.success,
                }
            });
        })
        .catch((res) => {
            console.error(`Ошибка ${res.status}`);
        });
}

export const getOrder = (urlOrders = '', ingredients = {}) => async (dispatch) => {
    if (ingredients.length != 0)
        postData(urlOrders, { ingredients })
            .then((data) => {
                return dispatch({ type: ADD_ORDER_NUMBER, payload: data });
            })
            .catch((res) => {
                console.error(`Ошибка ${res.status}`);
            });
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.ingredients)
    });

    if (response.ok) {
        return response.json();
    }
    response.json().then((err) => Promise.reject(err));
}

// Если вызываю, то ломает dispatch. Не знаю, как это исправить. 
// Если для зачтения задания надо это поправить - подскажите как, пожалуйста
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else
        return Promise.reject(`Ошибка ${res.status}`);
}