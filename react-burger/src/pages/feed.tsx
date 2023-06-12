import { FC } from 'react';
import styles from './feed.module.css'
import { FeedElements } from '../components/feed/feed';
import {} from '@ya.praktikum/react-developer-burger-ui-components';

export const Lenta: FC = () => {
    return (
        <>
            <div className={styles.header + " pt-10 pb-5 text text_type_main-large"}> Лента заказов</div>
            <div className={styles.main_container}>
                <FeedElements />
                <div className={styles.right_container}>
                    <div className={styles.right_first_container}>
                        <div className={styles.right_first_container_details + ' pb-15 text text_type_digits-default'}>
                            <div className='pb-6 text text_type_main-medium'> Готовы: </div>
                            <div className='pb-2' style={{color:'#00CCCC'}}> 034532 </div>
                            <div className='pb-2' style={{color:'#00CCCC'}}> 034533 </div>
                            <div className='pb-2' style={{color:'#00CCCC'}}> 034534 </div>
                        </div>
                        <div className={styles.right_first_container_details + ' text text_type_digits-default'}>
                            <div className='pb-6 text text_type_main-medium'> В работе: </div>
                            <div className='pb-2'> 134532 </div>
                            <div className='pb-2'> 134533 </div>
                            <div className='pb-2'> 134534 </div>
                        </div>
                    </div>
                    <div className='pb-15'>
                        <div className="text text_type_main-medium">Выполнено за все время:</div>
                        <div className='text text_type_digits-large'>28 965</div>
                    </div>
                    <div className='pb-15'>
                        <div className="text text_type_main-medium">Выполнено за сегодня:</div>
                        <div className='text text_type_digits-large'>138</div>
                    </div>
                </div>
            </div>
        </>
    );
}
