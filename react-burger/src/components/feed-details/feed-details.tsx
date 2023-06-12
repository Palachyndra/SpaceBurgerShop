import styles from './feed-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data'

const FeedDetails = () => {
    const elements: any = data;

    return (
        <div className={styles.container_all}>
            <div className="pt-10 pb-3 text text_type_main-large"> Black Hole  острый бургер </div>
            <div className={styles.color + " pb-15 text text_type_main-default"}> Выполнен </div>
            <div className="pb-6 text text_type_main-large"> Состав: </div>
            <div className={styles.container + " custom-scroll mb-10"}>
                {elements.main.map((element: any) => {
                    return (
                        <div className={styles.container_ingredients + " mb-5 pr-6"} key={element._id}>
                            <img className={styles.image + ' mr-4'} src={element.image_mobile} alt={element.name} />
                            <div className='text text_type_main-default'> {element.name} </div>
                            <div className={styles.right_text + ' pl-4'}>
                                <div className='text text_type_digits-default mr-2'>
                                    2 x {element.price}
                                </div>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.bottom_text + ' ml-4 mr-6'}>
                <div className='pb-4 text text_type_main-default text_color_inactive'> Вчера, 13:50 </div>
                <div className={styles.right_text}>
                    <div className='text text_type_digits-default mr-4'> 510 </div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default FeedDetails;