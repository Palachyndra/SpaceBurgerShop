
import React, { FC, Dispatch, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { checkResponseExport, getCookieExport } from '../services/actions';
import { urlApi, wsApi } from '../utils/context';
import styles from './login.module.css'
import { EXIT_AUTH } from '../constants/authorization';
import { FeedElements } from '../components/feed/feed';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START_WITH_TOKEN } from '../constants/ws';
import { useSelector } from '../types/hooks';

export const HistoryOrders: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: Dispatch<any> = useDispatch();
    const [current, setCurrent] = React.useState<string>('history');
    const token: string | undefined = getCookieExport('accessToken');

    const checkAuth = () => {
        if (token)
            return true;
        else
            return false;
    }

    const authorization: boolean = checkAuth()

    const onClickProfile = () => {
        setCurrent('profile')
        navigate('/profile');
    }

    const onClickHistoryOrders = () => {
        setCurrent('history')
        navigate('/profile/orders');
    }

    const onClickExit = () => {
        const url: string = urlApi + "auth/logout";
        const token: any = getCookieExport('refreshToken');
        setCurrent('exit');

        return fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
        }).then((checkResponseExport))
            .then((res) => {
                if (res.success) {
                    document.cookie = "refreshToken=''; max-age=-1";
                    document.cookie = "accessToken=''; max-age=-1";
                    dispatch({
                        type: EXIT_AUTH,
                        payload: false
                    });
                    navigate('/login');
                };
            })
    }
    
    const wsConnected = useSelector((state) => state.wsReducer.wsConnected);
    useEffect(() => {
        let token = getCookieExport("accessToken")
        if (token) token = token.substring(7);
        dispatch({ type: WS_CONNECTION_START_WITH_TOKEN, token: token });
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, [dispatch]);

    return wsConnected ? (
        <>
            {authorization ? (
                <div className={styles.container_row}>
                    <div>
                        <div className={"text text_type_main-medium pb-6 " + (current !== 'profile' && 'text text_type_main-default text_color_inactive')} onClick={onClickProfile}> Профиль </div>
                        <div className={"text text_type_main-medium pb-6 " + (current !== 'history' && 'text text_type_main-default text_color_inactive')} onClick={onClickHistoryOrders}> История заказов </div>
                        <div className={"text text_type_main-medium pb-6 " + (current !== 'exit' && 'text text_type_main-default text_color_inactive')} onClick={onClickExit}> Выход </div>
                    </div>
                    <div className={styles.main}>
                        <FeedElements />
                    </div>
                </div>
            ) : <Navigate to={location?.state?.from || '/login'} />}
        </>
    ) : <div> Loading </div>
}