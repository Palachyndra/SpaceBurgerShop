import React from 'react';
import ingredientType from '../../utils/types.js'
import style from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { DataOrder, DataSumOrder } from '../../utils/context.js'

const urlOrders = 'https://norma.nomoreparties.space/api/orders';


const BurgerConstructor = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { dataOrders } = React.useContext(DataOrder);
    const { sumState } = React.useContext(DataSumOrder);
    const [responceData, setResponceData] = React.useState({});

    const handleClose = () => {
        return setIsOpen(false);
    }

    const handleOpen = () => {
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

            if (response.ok) {
                return response.json();
            }
            response.json().then((err) => Promise.reject(err));
        }

        if (ingredients.length != 0)
            postData(urlOrders, { ingredients: ingredients })
                .then((data) => {
                    setResponceData(data)
                })
                .catch((res) => {
                    return Promise.reject(`Ошибка ${res.status}`);
                });

        if (responceData.success) {
            return setIsOpen(true);
        } else
            return setIsOpen(false);
    }

    return (
        <div className="ml-10 pb-10">
            <div className={style.constructor_bun} >
                {Object.keys(dataOrders).length !== 0 && (
                    <>
                        {dataOrders.map((prop, index) => {
                            return (
                                <CheckTopBun prop={prop} key={prop._id + index} />
                            )
                        })}
                        <div className={style.constructor_elements + ' custom-scroll'}>
                            {dataOrders.map((prop, index) => {
                                return (
                                    <CheckMiddleOrder prop={prop} key={prop._id + index} />
                                )
                            })}
                        </div>
                        {dataOrders.map((prop, index) => {
                            return (
                                <CheckBottomBun prop={prop} key={prop._id + index} />
                            )
                        })}
                    </>
                )}
            </div>
            <div className={style.container + " pt-10"}>
                <div className="pr-10 text text_type_digits-medium"> {sumState.sum} <CurrencyIcon className={style.size_icon} type="primary" /> </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleOpen}>
                    Оформить заказ
                </Button>
                {isOpen && <Modal title={''} onClose={handleClose} >
                    <OrderDetails responceData={responceData} />
                </Modal>}
            </div>
        </div>
    )
}


const CheckTopBun = ({ prop }) => {
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

const CheckBottomBun = ({ prop }) => {
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


const CheckMiddleOrder = ({ prop }) => {
    return (
        <div key={prop._id}>
            {(prop.type !== "top" && prop.type !== "bottom") && (<MiddleOrder props={prop} key={prop._id} />)}
        </div>
    )
}


const TopBun = ({ props }) => {
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

const BottomBun = ({ props }) => {
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

const MiddleOrder = ({ props }) => {
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
