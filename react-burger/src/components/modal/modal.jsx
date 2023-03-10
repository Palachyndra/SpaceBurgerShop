import React from 'react';
import ingredientType from '../../utils/types.js'
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import donePhoto from '../../images/done.png'

const Modal = ({ setIsOpen, props, orderOrNot }) => {
    React.useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27) {
            setIsOpen(false);
          }
        }
      window.addEventListener('keydown', close);
      return () => window.removeEventListener('keydown', close)
    },[])

    return (
        <>
        <div className={styles.dark} />
        <div className={styles.centered} >
            <div className={styles.header_container + " pl-10 pt-10 pr-10"}>
                {!orderOrNot && 
                <div className="text text_type_main-large">
                    Детали ингредиента
                </div>
                }
                <div className={styles.header_container_close} onClick={() => setIsOpen(false)}>
                    <CloseIcon />
                </div>
            </div>
        <ModalOverlay setIsOpen={setIsOpen} props={props} orderOrNot={orderOrNot} />
        </div>
      </>
    );
}

const ModalOverlay = ({ setIsOpen, props, orderOrNot }) => {
    return (
        <>
            <div onClick={() => setIsOpen(false)}>
                {orderOrNot && <OrderDetails /> }
                {!orderOrNot && <IngredientDetails props={props}/>} 
            </div>
        </>
    )
}

const IngredientDetails = ({props}) => {
    return (
        <div>
            <div className={styles.photo}> <img src={props.image_large} alt="Фотография"/> </div>  
            <div className={"text text_type_main-medium pt-4 pb-8"}> {props.name} </div>
            <div className={styles.burgers_container + " pb-15"}>
                <div className={styles.burgers_container_elements + " text text_type_main-default text_color_inactive"}>
                    <div> Калории,ккал </div>
                    <div className={"text text_type_digits-default"}> {props.calories} </div>
                </div>
                <div className={styles.burgers_container_elements + " text text_type_main-default text_color_inactive"}>
                    <div> Белки, г </div>
                    <div className={"text text_type_digits-default"}> {props.proteins} </div>
                </div>
                <div className={styles.burgers_container_elements + " text text_type_main-default text_color_inactive"}>
                    <div> Жиры, г </div>
                    <div className={"text text_type_digits-default"}> {props.fat} </div>
                </div>
                <div className={styles.burgers_container_elements + " text text_type_main-default text_color_inactive"}>
                    <div> Углеводы, г </div>
                    <div className={"text text_type_digits-default"}> {props.carbohydrates} </div>
                </div>
            </div>  
        </div>
    )
}

const OrderDetails = () => {
    return (
        <div>
            <div className={styles.text_shadow + " text text_type_digits-large pt-20"}> 034536 </div>
            <div className="text text_type_main-medium pt-8"> идентификатор заказа </div>
            <div className={"pb-15 pt-15"}> <img src={donePhoto} alt="Заказ принят"/> </div>
            <div className={"pb-30"}>
                <div className={"text text_type_main-default pb-2"}> Ваш заказ начали готовить </div>
                <div className={"text text_type_main-default text_color_inactive"}> Дождитесь готовности на орбитальной станции </div>
            </div>
        </div>
    )
}

OrderDetails.propTypes = { props: ingredientType };

export default Modal;
