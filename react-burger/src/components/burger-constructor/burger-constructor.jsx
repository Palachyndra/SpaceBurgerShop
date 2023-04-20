import React from 'react';
import style from './burger-constructor.module.css';
import { ADD_ORDER_NUMBER, INCREASE_SUM_ORDER, CHANGE_BUNS_ITEM, INCREASE_ORDER, SWITCH_ING_ITEM, CHANGE_INGREDIENTS_ITEM, DELETE_ITEM, DECREASE_SUM_ORDER } from '../../services/actions/burger.js';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { urlApi } from '../../utils/context.js'
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";

const urlOrders = urlApi + 'orders';

const BurgerConstructor = () => {
    const dataOrders = useSelector(store => store.cartReducer.ingredientsNow);
    const sumState = useSelector(store => store.cartReducer.sumOrders);
    const [isOpen, setIsOpen] = React.useState(false);
    const [cards, setCards] = React.useState(dataOrders.ingredients);

    React.useEffect(() => {
        setCards(dataOrders.ingredients)
    })

    const dispatch = useDispatch();
    const orderNumber = useSelector(store => store.cartReducer.orderNumber);

    const handleClose = () => {
        return setIsOpen(false);
    }


    const handleOpen = () => {
        let ingredients = [];
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
                    return dispatch({ type: ADD_ORDER_NUMBER, payload: data });
                })
                .catch((res) => {
                    return Promise.reject(`Ошибка ${res.status}`);
                });
        if (orderNumber.success) {
            return setIsOpen(true);
        } else
            return setIsOpen(false);
    }


    const [{ canDrop }, dropIngredients] = useDrop({
        accept: "ingredients",
        drop(payload) {
            dispatch({
                type: CHANGE_INGREDIENTS_ITEM,
                payload
            });
            dispatch({ type: INCREASE_SUM_ORDER, payload });
        },
    })

    const [{ canDropTopBun }, dropTopBun] = useDrop({
        accept: "buns",
        drop(payload) {
            dispatch({
                type: CHANGE_BUNS_ITEM,
                payload
            });
            dispatch({
                type: INCREASE_ORDER,
                payload
            });
        },
    })
    const [{ canDropBottomBun }, dropBottomBun] = useDrop({
        accept: "buns",
        drop(payload) {
            dispatch({
                type: CHANGE_BUNS_ITEM,
                payload
            });
            dispatch({
                type: INCREASE_ORDER,
                payload
            });
        },
    })

    const moveCard = React.useCallback((dragIndex, hoverIndex) =>
        dispatch({
            type: SWITCH_ING_ITEM,
            payload: { dragIndex, hoverIndex }
        })
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
                            {Object.entries(cards).map(([i, card]) => renderCard(card, i))}
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
                <div className="pr-10 text text_type_digits-medium"> {sumState} <CurrencyIcon className={style.size_icon} type="primary" /> </div>
                <>
                    {Object.keys(dataOrders.bun).length !== 0 && Object.keys(dataOrders.ingredients).length !== 0 && (
                        <Button htmlType="button" type="primary" size="large" onClick={handleOpen}>
                            Оформить заказ
                        </Button>
                    )}
                </>
                {isOpen && <Modal title={''} onClose={handleClose} >
                    <OrderDetails responceData={orderNumber} />
                </Modal>}
            </div>
        </div>
    )
}


const MiddleOrder = ({ id, props, index, moveCard }) => {
    const dispatch = useDispatch();
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
            <div onClick={() => handleOnClick(props, dispatch)}>
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

const handleOnClick = (props, dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: props });
    dispatch({ type: DECREASE_SUM_ORDER, payload: props });
}

export default BurgerConstructor;
