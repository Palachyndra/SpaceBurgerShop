import { urlApi } from '../../utils/context'
import { INSTALL_DATA, ADD_ORDER_NUMBER } from '../../constants/burger'
import { GET_AUTH } from '../../constants/authorization';
import { request } from '../../utils/request';
import { TStoreBurgerData } from '../../types/generalTypes'

export const getStore = () => async (dispatch: any) => {
    const url = urlApi + "ingredients";
    fetch(url)
        .then((checkResponseExport))
        .then((res) => {
            const bun: Array<TStoreBurgerData> = [];
            const souce: Array<TStoreBurgerData> = [];
            const main: Array<TStoreBurgerData> = [];

            res.data.map((prop: TStoreBurgerData) => {
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

export const getOrder = (urlOrders: string = '', ingredients: any) => (dispatch: any) => {
    if (ingredients.length != 0)
        postData(urlOrders, { ingredients })
            .then((data) => {
                dispatch({ type: ADD_ORDER_NUMBER, payload: data });
            })
            .catch((res) => {
                console.error(`Ошибка ${res.status}`);
            });
}

const postData = (url: string = '', data: any = {}) => {
    const token: any = getCookieExport("accessToken"); 
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        body: JSON.stringify(data.ingredients)
    }).then((checkResponseExport));
}

export const authorization = () => async (dispatch: any) => {
    const data = await request("auth/user", {
        method: 'GET'
    })
    if (data.success) {
        dispatch({
            type: GET_AUTH,
            payload: data
        });
    } else {
        document.cookie = "refreshToken=''; max-age=-1";
        document.cookie = "accessToken=''; max-age=-1";
    }
}

export function getCookieExport(name: string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const checkResponseExport = (res: Response) => {
    if (res.ok) {
        return res.json();
    } else
        return Promise.reject(`Ошибка ${res.status}`);
}
