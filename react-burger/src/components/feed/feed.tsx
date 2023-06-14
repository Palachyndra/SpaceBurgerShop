import styles from './feed.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../types/hooks';
import { TStoreBurgerData } from '../../types/generalTypes';

export const FeedElements = () => {
    const location = useLocation();
    let url = '/feed/'
    if (location.pathname.startsWith('/profile')) url = '/profile/orders/';
    const maxIngredients = 6;
    let sum = 0;
    let wsReducer = useSelector((state) => state.wsReducer);
    const dataBurgers = useSelector((store) => store.cartReducer.items.data);

    return wsReducer.wsConnected ? (
        <>
            <div className={styles.orders_elements_container + ' custom-scroll'}>
                {wsReducer.messages.success && Object.entries(wsReducer.messages.orders).map((element: any, index: number) =>
                    <Link to={`${url}${element[1]._id}`} state={{ background: location }}>
                        <div key={element._id} className={styles.orders_container + " pr-6 pl-6 m-2"} >
                            <div className={styles.orders_top_text + " mt-6 mb-6"}>
                                <div className='text text_type_digits-default'> #{element[1].number} </div>
                                <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(element[1].createdAt)} />
                            </div>
                            <div className='text text_type_main-medium'> {element[1].name} </div>
                            <div className={styles.orders_bottom + ' mb-6 mt-6'}>
                                <div className={styles.orders_bottom_left}>
                                    {element[1].ingredients.map((element: any, index: number) => {
                                        const data = dataBurgers.bun.filter((item: TStoreBurgerData) => item._id === element)[0] ?
                                            dataBurgers.bun.filter((item: TStoreBurgerData) => item._id === element)[0] :
                                            dataBurgers.souce.filter((item: TStoreBurgerData) => item._id === element)[0] ?
                                                dataBurgers.souce.filter((item: TStoreBurgerData) => item._id === element)[0] :
                                                dataBurgers.main.filter((item: TStoreBurgerData) => item._id === element)[0] ?
                                                    dataBurgers.main.filter((item: TStoreBurgerData) => item._id === element)[0] :
                                                    "";
                                        const zIndex = maxIngredients - index;
                                        const right = 20 * index;
                                        const remains = maxIngredients;
                                        sum = sum + data.price;
                                        if (zIndex > 0)
                                            return (
                                                <li
                                                    className={styles.image_container}
                                                    key={data._id + index}
                                                    style={{
                                                        zIndex: zIndex, right: right,
                                                    }}
                                                >
                                                    <img
                                                        className={styles.image}
                                                        src={data.image_mobile}
                                                        alt={data.name}
                                                        style={{
                                                            opacity: data && maxIngredients === index + 1 ? '0.5' : '1'
                                                        }}
                                                    />
                                                    {maxIngredients === index + 1 && zIndex > 0 ? (
                                                        <span className={styles.image_span + ' text text_type_main-default'}>
                                                            {'+' + remains}
                                                        </span>
                                                    ) : null}
                                                </li>
                                            )
                                    })}
                                </div>
                                <div className={styles.orders_bottom_right + " mt-6 ml-6"}>
                                    <div className='text text_type_digits-default'> {sum} </div>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                            <span style={{ display: 'none' }}>{sum = 0}</span>
                        </div>
                    </Link >
                )}
            </div>
        </>
    ) : (
        <div> Loading... </div>
    )
}