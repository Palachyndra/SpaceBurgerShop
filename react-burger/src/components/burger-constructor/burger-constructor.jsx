import React  from 'react';
import ingredientType from '../../utils/types.js'
import style from './burger-constructor.module.css';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import datafile from '../../utils/order.js'


function sumOrder(data) {
    let sumPrice = 0;
    data.order.map(price => sumPrice = sumPrice + price.price);
    return sumPrice;
}
   
const BurgerConstructor = () => {
   const data = datafile;
   let sumPrice = sumOrder(data);
   
   return (
        <div className="ml-10 pb-10">
            <div className={style.constructor_bun} >
                {data.order.map((prop) => {
                    return (
                        <CheckTopBun prop={prop} key={prop._id} />
                    )
                })}
                <div className={style.constructor_elements  + ' custom-scroll'}>
                    {data.order.map((prop) => {
                        return (
                         <CheckMiddleOrder prop={prop} key={prop._id} /> 
                        )
                    })}
                </div>
                {data.order.map((prop) => {
                    return (
                        <CheckBottomBun prop={prop} key={prop._id} />
                    )
                })}
            </div>
            <div className={style.container + " pt-10"}>
                <div className="pr-10 text text_type_digits-medium"> {sumPrice} <CurrencyIcon className={style.size_icon} type="primary"/> </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}
const CheckTopBun = ({prop}) => {
    return (
        <>
        {prop.type === "top" && (
        <div>
            <TopBun props={prop} key={prop._id} />
        </div> 
        )}
        </>
    )
}

const CheckBottomBun = ({prop}) => {
    return (
        <>
        {prop.type === "bottom" && (
        <div>
            <BottomBun props={prop} key={prop._id} />
        </div> 
        )}
        </>
    )
}


const CheckMiddleOrder = ({prop}) => {
    return (
        <div key={prop._id}>
            {(prop.type !== "top" && prop.type !== "bottom") && (<MiddleOrder props={prop} key={prop._id} />)}
        </div>
    )
}


const TopBun = ({props}) => {
    return (
        <div className={style.container + ' ' + style.padding_element} >
            <ConstructorElement
                type={props.type}
                isLocked={props.isLocked}
                text={props.name}
                price={props.price}
                thumbnail={props.image_mobile}
            />
        </div>
    )
}

const BottomBun = ({props}) => {
    return (
        <>
            <div className={style.container + ' ' + style.padding_element} >
                <ConstructorElement
                    type={props.type}
                    isLocked={props.isLocked}
                    text={props.name}
                    price={props.price}
                    thumbnail={props.image_mobile}
                />
            </div>
        </>
    )
}

const MiddleOrder = ({props}) => {
    return (
        <div className={style.order_container}>
            <DragIcon type="primary" />
            <ConstructorElement
                type={props.type}
                isLocked={props.isLocked}
                text={props.name}
                price={props.price}
                thumbnail={props.image_mobile}
            />
        </div>
    )
}

ConstructorElement.propTypes =
    { props: ingredientType, };

export default BurgerConstructor;
