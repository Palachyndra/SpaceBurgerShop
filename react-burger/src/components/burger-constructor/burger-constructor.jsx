import React from 'react';
import ingredientType from '../../utils/types.js'
import style from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { DataSumOrder } from '../../utils/context.js'
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import update from 'immutability-helper';

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
        Object.keys(dataOrders.ingredients).forEach(key => {
            ingredients.push(dataOrders.ingredients[key]._id);
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


    const { sumDispatcher } = React.useContext(DataSumOrder);
    const [{ canDrop }, dropIngredients] = useDrop({
        accept: "ingredients",
        drop(payload) {
            dispatch({
                type: "CHANGE_INGREDIENTS_ITEM",
                payload
            });
            sumDispatcher({ type: "increment_in_order", payload });
        },
    })

    const [{ canDropTopBun }, dropTopBun] = useDrop({
        accept: "buns",
        drop(payload) {
            dispatch({
                type: "CHANGE_BUNS_ITEM",
                payload
            });
            sumDispatcher({ type: "increment", payload });
        },
    })
    const [{ canDropBottomBun }, dropBottomBun] = useDrop({
        accept: "buns",
        drop(payload) {
            dispatch({
                type: "CHANGE_BUNS_ITEM",
                payload
            });
            // sumDispatcher({ type: "increment", payload });
        },
    })

    const moveCard = React.useCallback((dragIndex, hoverIndex) =>
        dispatch({
            type: "SWITCH_ING_ITEM",
            payload: update(dataOrders.ingredients, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dataOrders.ingredients[dragIndex]],
                ],
            }),
        }),
    )

    const renderCard = React.useCallback((card, index) => {
        return (
            <MiddleOrder
                key={card.uuid}
                index={index}
                id={card.uuid}
                props={card}
                moveCard={moveCard}
            />
        )
    }, [])

    return (
        <div className="ml-10 pb-10">
            <div className={style.constructor_bun} >
                <>
                    {Object.keys(dataOrders.bun).length !== 0 ? (
                        <>
                            {Object.entries(dataOrders.bun).map(([index, prop]) => {
                                return (
                                    <TopBun refBun={dropTopBun} props={prop} key={prop._id + index} />
                                )
                            })}
                        </>
                    ) : (
                        <div ref={dropTopBun} className={"constructor-element constructor-element_pos_top constructor-element__text"}>
                            <span className={style.marging_left}>Выберите булку</span>
                        </div>
                    )}
                    {Object.keys(dataOrders.ingredients).length !== 0 ? (
                        <div ref={dropIngredients} className={style.constructor_elements + ' custom-scroll'}>
                            {Object.entries(dataOrders.ingredients).map(([i, card]) => renderCard(card, i))}
                        </div>
                    ) : (
                        <div ref={dropIngredients} className={"constructor-element constructor-element__text"}>
                            <span className={style.marging_left}>Выберите начинку</span>
                        </div>
                    )}
                    {Object.keys(dataOrders.bun).length !== 0 ? (
                        <>
                            {Object.entries(dataOrders.bun).map(([index, prop]) => {
                                return (
                                    <BottomBun refBun={dropBottomBun} props={prop} key={prop._id + index} />
                                )
                            })}
                        </>
                    ) : (
                        <div ref={dropBottomBun} className={"constructor-element constructor-element_pos_bottom constructor-element__text"}>
                            <span className={style.marging_left}>Выберите булку</span>
                        </div>
                    )}
                </>
            </div>
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


const MiddleOrder = ({ id, props, index, moveCard }) => {
    const dispatch = useDispatch();
    const { sumDispatcher } = React.useContext(DataSumOrder);
    const ref = React.useRef(null)

    const [{ handlerId }, drop] = useDrop({
        accept: "ingredients2",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: "ingredients2",
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className={style.container + ' ' + style.padding_element} >
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


const TopBun = ({ props, refBun }) => {
    if (props.type === "top")
        return (
            <div ref={refBun} className={style.container + ' ' + style.padding_element} >
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

const BottomBun = ({ props, refBun }) => {
    if (props.type === "bottom")
        return (
            <div ref={refBun} className={style.container + ' ' + style.padding_element} >
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

const handleOnClick = (props, dispatch, sumDispatcher) => {
    dispatch({ type: "DELETE_ITEM", payload: props });
    sumDispatcher({ type: "decrease", payload: props });
}
ConstructorElement.propTypes =
    { props: ingredientType, };

export default BurgerConstructor;
