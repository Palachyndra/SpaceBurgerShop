import { getCookieExport } from '../services/actions';
import { urlApi } from './context'

export const request = async (url:string, headers: any) => {
    try {
        const params = headers;
        const acctoken: string | undefined = getCookieExport('accessToken');
        params.headers = {...params.headers, Authorization: acctoken};
        const data = await fetch(urlApi + url, params);
        return await checkResponse(data);
    }
    catch(e: any) {
        if (e.message === "jwt expired") {
            const params = headers;
            const result = await refToken();
                if(result.ok) {
                    const date = new Date(Date.now() + 1200e3)
                    const value = await result.json();
                    document.cookie = `accessToken=${value.accessToken}; expires=${date}; path='/'`
                    params.headers = {...params.headers, Authorization: value.accessToken};
                    document.cookie = `refreshToken=${value.refreshToken}; path='/'`
                    const ref = await fetch(urlApi + url, params);
                    return await checkResponse(ref);
                }
        } else {
            return Promise.reject(e);
        };
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

const checkResponse = (res: any) => {
    return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
};