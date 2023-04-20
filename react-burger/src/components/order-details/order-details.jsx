import styles from './order-details.module.css';
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import donePhoto from '../../images/done.png';
import number from '../../utils/types.js';

const OrderDetails = ({responceData}) => {
    return (
        <div>
            <div className={styles.text_shadow + " text text_type_digits-large pt-20"}> {responceData.order.number} </div>
            <div className="text text_type_main-medium pt-8"> идентификатор заказа </div>
            <div className={"pb-15 pt-15"}> <img src={donePhoto} alt="Заказ принят" /> </div>
            <div className={"pb-30"}>
                <div className={"text text_type_main-default pb-2"}> Ваш заказ начали готовить </div>
                <div className={"text text_type_main-default text_color_inactive"}> Дождитесь готовности на орбитальной станции </div>
            </div>
        </div>
    )
}
OrderDetails.propTypes =
    { responceData: number, };


export default OrderDetails;