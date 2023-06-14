import React, { useEffect, Dispatch, useCallback } from 'react';
import styles from './feed-details.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../types/hooks';
import { useLocation } from "react-router-dom";
import { TStoreBurgerData } from '../../types/generalTypes';
import { getCookieExport } from '../../services/actions';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_CONNECTION_START_WITH_TOKEN } from '../../constants/ws';
import { wsApi } from '../../utils/context';

const FeedDetails = () => {
    const dispatch: Dispatch<any> = useDispatch();
    // useEffect(() => {
    //     let token = getCookieExport("accessToken")
    //     if (token) token = token.substring(7);
    //     dispatch({ type: WS_CONNECTION_START_WITH_TOKEN, url: `${wsApi}?token=${token}` });
    //     return () => {
    //         dispatch({ type: WS_CONNECTION_CLOSED });
    //     };
    // }, []);
    const location = useLocation();
    let id = '';
    if (location.pathname.startsWith('/profile')) {
        id = location.pathname.split('/')[3]
    } else {
        id = location.pathname.split('/')[2]
    }
    const wsReducer = useSelector((state) => state.wsReducer);

    const dataBurgers = useSelector((store) => store.cartReducer.items.data);
    const element: any = Object.values(wsReducer.messages.orders).filter((element: any) => element._id === id)[0]
    console.log(element)

    let sum: number = 0;
    const countItems: any = [];
    for (const item of element.ingredients) {
        countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
    }

    return (
        <div className={styles.container_all}>
            <div className={styles.main_text + " pt-10 pb-3 text text_type_main-large"}> {element.name} </div>
            <div className={styles.color + " pb-15 text text_type_main-default"}> {element.status === 'done' ? 'Выполнено' : element.status === 'created' ? "Создан" : "Готовится"} </div>
            <div className="pb-6 text text_type_main-large"> Состав: </div>
            <div className={styles.container + " custom-scroll mb-10"}>
                {Object.keys(countItems).map((element: any) => {
                    const data = dataBurgers.bun.filter((item: TStoreBurgerData) => item._id === element)[0] ?
                        dataBurgers.bun.filter((item: TStoreBurgerData) => item._id === element)[0] :
                        dataBurgers.souce.filter((item: TStoreBurgerData) => item._id === element)[0] ?
                            dataBurgers.souce.filter((item: TStoreBurgerData) => item._id === element)[0] :
                            dataBurgers.main.filter((item: TStoreBurgerData) => item._id === element)[0] ?
                                dataBurgers.main.filter((item: TStoreBurgerData) => item._id === element)[0] :
                                "";
                    const value: any = Object.entries(countItems).filter((el) => el[0] === data._id)
                    sum = sum + value[0] * data.price;
                    return (
                        <div className={styles.container_ingredients + " mb-5 pr-6"} key={data._id}>
                            <img className={styles.image + ' mr-4'} src={data.image_mobile} alt={data.name} />
                            <div className='text text_type_main-default'> {data.name} </div>
                            <div className={styles.right_text + ' pl-4'}>
                                <div className='text text_type_digits-default mr-2'>
                                    1 x {data.price}
                                </div>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.bottom_text + ' ml-4 mr-6'}>
                <FormattedDate className='pb-4 text text_type_main-default text_color_inactive' date={new Date(element.createdAt)} />
                <div className={styles.right_text}>
                    <div className='text text_type_digits-default mr-4'> {sum} </div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default FeedDetails;