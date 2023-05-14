import { getCookieExport } from '../services/actions';
import { urlApi } from '../utils/context.js'

export const request = async (url, headers) => {
    try {
        const params = headers;
        const acctoken = getCookieExport('accessToken');
        params.headers = {...params.headers, Authorization: acctoken};
        const data = await (await fetch(urlApi + url, params)).json();
        if (data.message === "jwt expired") {
            const reuslt = await refToken() ;
                if(reuslt.ok) {
                    const date = new Date(Date.now() + 1200e3)
                    const value = await reuslt.json();
                    document.cookie = `accessToken=${value.accessToken}; expires=${date}; path='/'`
                    params.headers.Authorization = value.accessToken;
                    document.cookie = `refreshToken=${value.refreshToken}; path='/'`
                    const ref = await (await fetch(urlApi + url, params)).json();
                    return ref;
                }
        } else {
            return data
        };
    }
    catch(e) {
        console.error(`Ошибка ${e.status}`);
    }
}

const refToken = async () => {
    const url = urlApi + "auth/token";
    const token = getCookieExport('refreshToken');

    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
        }) 
}