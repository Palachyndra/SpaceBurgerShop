import React from 'react';
import styles from './order-details.module.css';
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import donePhoto from '../../images/done.png';
import { DataOrder } from '../../utils/context.js'


const OrderDetails = () => {
    const { dataOrders } = React.useContext(DataOrder);
    const [responceData, setResponceData] = React.useState({});

    const url = 'https://norma.nomoreparties.space/api/orders';
    var ingredients = [];
    Object.keys(dataOrders).forEach(key => {
        ingredients.push(dataOrders[key]._id);
    });

    const postData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    React.useEffect(() => {
        postData(url, { ingredients: ingredients })
            .then((data) => {
                setResponceData(data)
            })
            .catch((res) => {
                return Promise.reject(`Ошибка ${res.status}`);
            });
    }, []);

    return (
        <div>
            {responceData.success &&
                <>
                    <div className={styles.text_shadow + " text text_type_digits-large pt-20"}> {responceData.order.number} </div>
                    <div className="text text_type_main-medium pt-8"> идентификатор заказа </div>
                    <div className={"pb-15 pt-15"}> <img src={donePhoto} alt="Заказ принят" /> </div>
                    <div className={"pb-30"}>
                        <div className={"text text_type_main-default pb-2"}> Ваш заказ начали готовить </div>
                        <div className={"text text_type_main-default text_color_inactive"}> Дождитесь готовности на орбитальной станции </div>
                    </div>
                </>
            }
        </div>
    )
}

export default OrderDetails;