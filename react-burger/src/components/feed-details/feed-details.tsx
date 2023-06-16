import React, { useEffect, Dispatch, useCallback } from 'react';
import styles from './feed-details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../types/hooks';
import { useLocation } from "react-router-dom";
import { TStoreBurgerData } from '../../types/generalTypes';
import { getCookieExport } from '../../services/actions';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_START_WITH_TOKEN } from '../../constants/ws';
import { dataFilter, wsApi } from '../../utils/context';

const FeedDetails = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const location = useLocation();
    let id = '';
    if (location.pathname.startsWith('/profile')) {
        id = location.pathname.split('/')[3]
    } else {
        id = location.pathname.split('/')[2]
    }
    let wsReducer = useSelector((state) => state.wsReducer);

    const dataBurgers = useSelector((store) => store.cartReducer.items.data);
    let sum: number = 0;
    useEffect(() => {
        if (!wsReducer.wsConnected || id) {
            if (location.pathname.startsWith('/profile')) {
                let token = getCookieExport("accessToken")
                if (token) token = token.substring(7);
                dispatch({ type: WS_CONNECTION_START_WITH_TOKEN, url: `${wsApi}?token=${token}` });
            }
            if (location.pathname.startsWith('/feed')) {
                dispatch({ type: WS_CONNECTION_START, url: `${wsApi}/all` });
            }
        }
        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, [dispatch]);

    let elements: any = Object.values(wsReducer.messages.orders).filter((element: any) => element._id === id)[0]
    let countItems: any = [];
    if (wsReducer.wsConnected && wsReducer.messages.success) {
        for (const item of elements.ingredients) {
            countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
        }
    }
    return (
        <>
            {wsReducer.wsConnected && wsReducer.messages.success ? (
                <>
                    <div className={styles.container_all}>
                        <div className={styles.main_text + " pt-10 pb-3 text text_type_main-large"}> {elements.name} </div>
                        <div className={styles.color + " pb-15 text text_type_main-default"}> {elements.status === 'done' ? 'Выполнено' : elements.status === 'created' ? "Создан" : "Готовится"} </div>
                        <div className="pb-6 text text_type_main-large"> Состав: </div>
                        <div className={styles.container + " custom-scroll mb-10"}>
                            {Object.keys(countItems).map((element: any) => {
                                const data = dataFilter(dataBurgers, element);
                                const value = countItems[data._id];
                                sum = sum + value * data.price;
                                return (
                                    <div className={styles.container_ingredients + " mb-5 pr-6"} key={data._id}>
                                        <img className={styles.image + ' mr-4'} src={data.image_mobile} alt={data.name} />
                                        <div className='text text_type_main-default'> {data.name} </div>
                                        <div className={styles.right_text + ' pl-4'}>
                                            <div className='text text_type_digits-default mr-2'>
                                                {value} x {data.price}
                                            </div>
                                            <CurrencyIcon type="primary" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.bottom_text + ' ml-4 mr-6'}>
                            <FormattedDate className='pb-4 text text_type_main-default text_color_inactive' date={new Date(elements.createdAt)} />
                            <div className={styles.right_text}>
                                <div className='text text_type_digits-default mr-4'> {sum} </div>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div> Loading... </div>
            )}
        </>
    )
}

export default FeedDetails;