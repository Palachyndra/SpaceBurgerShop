import { FC, useEffect } from 'react';
import styles from './feed.module.css'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../constants/ws';
import { FeedElements } from '../components/feed/feed';
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../types/hooks';
import { getCookieExport } from '../services/actions';
import { useLocation, Navigate } from "react-router-dom";

export const Lenta: FC = () => {
    const wsReducer = useSelector((state) => state.wsReducer);
    const location = useLocation();
    let count = 0;
    const dispatch = useDispatch();
    const token: string | undefined = getCookieExport('accessToken');

    const checkAuth = () => {
        if (token)
            return true;
        else
            return false;
    }
    const authorization: boolean = checkAuth()

    useEffect(() => {
        // @ts-ignore - не знаю, как поправить
        dispatch({ type: WS_CONNECTION_START });
        return () => {
            // @ts-ignore - не знаю, как поправить
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, [dispatch]);
    return (
        <>
            {authorization ? (
                <>
                    <div className={styles.header + " pt-10 pb-5 text text_type_main-large"}> Лента заказов</div>
                    <div className={styles.main_container}>
                        <FeedElements />
                        <div className={styles.right_container}>
                            <div className={styles.right_first_container}>
                                <div className={styles.right_first_container_details + ' pb-15 text text_type_digits-default'}>
                                    <div className='pb-6 text text_type_main-medium'> Готовы: </div>
                                    {wsReducer.messages.success && Object.entries(wsReducer.messages.orders).map((element: any, index: number) => {
                                        count++
                                        return (
                                            <>
                                                {element[1].status === 'done' && count <= 10 && (
                                                    <>
                                                        <div className='pb-2' style={{ color: '#00CCCC' }}> {element[1].number} </div>
                                                    </>
                                                )}
                                            </>
                                        )
                                    })}
                                </div>
                                <div className={styles.right_first_container_details + ' text text_type_digits-default'}>
                                    <div className='pb-6 text text_type_main-medium'> В работе: </div>
                                    <span style={{ display: 'none' }}> {count = 0}</span>
                                    {wsReducer.messages.success && Object.entries(wsReducer.messages.orders).map((element: any, index: number) => {
                                        count++
                                        return (
                                            <>
                                                {element[1].status !== 'done' && count <= 10 && (
                                                    <>
                                                        <div className='pb-2'> {element[1].number} </div>
                                                    </>
                                                )}
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='pb-15'>
                                <div className="text text_type_main-medium">Выполнено за все время:</div>
                                <div className='text text_type_digits-large'>{wsReducer.messages.total}</div>
                            </div>
                            <div className='pb-15'>
                                <div className="text text_type_main-medium">Выполнено за сегодня:</div>
                                <div className='text text_type_digits-large'>{wsReducer.messages.totalToday}</div>
                            </div>
                        </div>
                    </div>
                </>
            ) : <Navigate to={location?.state?.from || '/login'} />}
        </>
    );
}
