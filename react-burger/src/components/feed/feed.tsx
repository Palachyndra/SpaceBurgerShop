import styles from './feed.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data'
import { Link, useLocation } from 'react-router-dom';

export const FeedElements = () => {
    const location = useLocation();
    let url = '/feed/'
    if (location.pathname === '/profile/orders') url = '/profile/orders/'; 
    const elements: any = data;
    const maxIngredients = 6;
    const count = elements.main.length;

    const handleOpen = () => {
        // что-то
    }

    return (
        <>
        <Link to={`${url}${elements.bun[0]._id}`} state={{ background: location }}>
            <div className={styles.orders_elements_container + ' custom-scroll'} onClick={handleOpen}>
                <div className={styles.orders_container + " pr-6 pl-6 m-2"}>
                    <div className={styles.orders_top_text + " mt-6 mb-6"}>
                        <div className='text text_type_digits-default'> #123 </div>
                        <div className='text text_type_main-default text_color_inactive'> Сегодня, 16:20 </div>
                    </div>
                    <div className='text text_type_main-medium'> Death Star Starship Main бургер </div>
                    <div className={styles.orders_bottom + ' mb-6 mt-6'}>
                        <div className={styles.orders_bottom_left}>
                            {elements.main.map((element: any, index: number) => {
                                const zIndex = maxIngredients - index;
                                const right = 20 * index;
                                const remains = count - maxIngredients;
                                if (zIndex > 0)
                                    return (
                                        <li
                                            className={styles.image_container}
                                            key={element._id}
                                            style={{
                                                zIndex: zIndex, right: right,
                                            }}
                                        >
                                            <img
                                                className={styles.image}
                                                src={element.image_mobile}
                                                alt={element.name}
                                                style={{
                                                    opacity: element && maxIngredients === index + 1 ? '0.5' : '1'
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
                            <div className='text text_type_digits-default'> 450 </div>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>

                <div className={styles.orders_container + " pr-6 pt-6 pl-6 m-2"}>
                    <div className={styles.orders_top_text + " mt-6 mb-6"}>
                        <div className='text text_type_digits-default'> #123 </div>
                        <div className='text text_type_main-default text_color_inactive'> Сегодня, 16:20 </div>
                    </div>
                    <div className='text text_type_main-medium'> Death Star Starship Main бургер </div>
                    <div className={styles.orders_bottom + ' mb-6 mt-6'}>
                        <div className={styles.orders_bottom_left}>
                            {elements.main.map((element: any, index: number) => {
                                const zIndex = maxIngredients - index;
                                const right = 20 * index;
                                const remains = count - maxIngredients;
                                if (zIndex > 0)
                                    return (
                                        <li
                                            className={styles.image_container}
                                            key={element._id}
                                            style={{
                                                zIndex: zIndex, right: right,
                                            }}
                                        >
                                            <img
                                                className={styles.image}
                                                src={element.image_mobile}
                                                alt={element.name}
                                                style={{
                                                    opacity: element && maxIngredients === index + 1 ? '0.5' : '1'
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
                            <div className='text text_type_digits-default'> 450 </div>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        </>
    )
}