import React from 'react';
import ingredientType from '../../utils/types.js'
import style from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { DataSumOrder } from '../../utils/context.js'
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const urlOrders = 'https://norma.nomoreparties.space/api/orders';

const BurgerConstructor = () => {
    const dataOrders = useSelector(store => store.cartReducer.ingredientsNow);

    const [isOpen, setIsOpen] = React.useState(false);
    const { sumState } = React.useContext(DataSumOrder);
    const dispatch = useDispatch();
    const orderNumber = useSelector(store => store.cartReducer.orderNumber);


    const handleClose = () => {
        return setIsOpen(false);
    }

    const handleOpen = () => {
        var ingredients = [];
        Object.keys(dataOrders.data).forEach(key => {
            ingredients.push(dataOrders.data[key]._id);
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
            postData(urlOrders, { ingredients })
                .then((data) => {
                    return dispatch({ type: "ADD_ORDER_NUMBER", payload: data });
                })
                .catch((res) => {
                    return Promise.reject(`Ошибка ${res.status}`);
                });
        if (orderNumber.success) {
            return setIsOpen(true);
        } else
            return setIsOpen(false);
    }

    return (
        <div className="ml-10 pb-10">
            <DndProvider backend={HTML5Backend}>
                <div className={style.constructor_bun} >
                    {Object.keys(dataOrders).length !== 0 && (
                        <>
                            {dataOrders.data.map((prop, index) => {
                                return (
                                    <CheckTopBun prop={prop} key={prop._id + index} />
                                )
                            })}
                            <div className={style.constructor_elements + ' custom-scroll'}>
                                {dataOrders.data.map((prop, index) => {
                                    return (
                                        <CheckMiddleOrder prop={prop} key={prop._id + index} />
                                    )
                                })}
                            </div>
                            {dataOrders.data.map((prop, index) => {
                                return (
                                    <CheckBottomBun prop={prop} key={prop._id + index} />
                                )
                            })}
                        </>
                    )}
                </div>
            </DndProvider>
            <div className={style.container + " pt-10"}>
                <div className="pr-10 text text_type_digits-medium"> {sumState.sum} <CurrencyIcon className={style.size_icon} type="primary" /> </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleOpen}>
                    Оформить заказ
                </Button>
                {isOpen && <Modal title={''} onClose={handleClose} >
                    <OrderDetails responceData={orderNumber} />
                </Modal>}
            </div>
        </div>
    )
}


const CheckTopBun = ({ prop }) => {
    const dispatch = useDispatch();
    const { sumDispatcher } = React.useContext(DataSumOrder);
    const [{ canDrop }, drop] = useDrop({
        accept: "sauce",
        drop(payload) {
            dispatch({
                type: "CHANGE_ITEM",
                payload
            });
            sumDispatcher({ type: "increment", payload });
        },
    })
    return (
        <>
            {prop.type === "top" && (
                <div ref={drop}>
                    <TopBun props={prop} key={prop._id} />
                </div>
            )}
        </>
    )
}

const CheckBottomBun = ({ prop }) => {
    const dispatch = useDispatch();
    const { sumDispatcher } = React.useContext(DataSumOrder);
    const [{ canDrop }, drop] = useDrop({
        accept: "sauce",
        drop(payload) {
            dispatch({
                type: "CHANGE_ITEM",
                payload
            });
            sumDispatcher({ type: "increment", payload });
        },
    })
    return (
        <>
            {prop.type === "bottom" && (
                <div ref={drop}>
                    <BottomBun props={prop} key={prop._id} />
                </div>
            )}
        </>
    )
}


const CheckMiddleOrder = ({ prop }) => {
    const dispatch = useDispatch();
    const { sumDispatcher } = React.useContext(DataSumOrder);
    const [{ canDrop }, drop] = useDrop({
        accept: "sauce",
        drop(payload) {
            dispatch({
                type: "INCREASE_ITEM",
                payload
            });
            sumDispatcher({ type: "increment", payload });
        },
    })

    return (
        <div ref={drop} key={prop._id}>
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
    const dispatch = useDispatch();
    const { sumDispatcher } = React.useContext(DataSumOrder);
    return (
        <div className={style.order_container}>
            <DragIcon type="primary" />
            <div onClick={() => handleOnClick(props, dispatch, sumDispatcher)}>
                <ConstructorElement
                    type={props.type}
                    isLocked={props.isLocked}
                    text={props.name}
                    price={props.price}
                    thumbnail={props.image_mobile}
                />
            </div>
        </div>
    )
}
const handleOnClick = (props, dispatch, sumDispatcher) => {
    dispatch({ type: "DELETE_ITEM", payload: props });
    sumDispatcher({ type: "decrease", payload: props });
}
ConstructorElement.propTypes =
    { props: ingredientType, };

export default BurgerConstructor;
