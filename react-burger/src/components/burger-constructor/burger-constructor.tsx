import React from 'react';
import style from './burger-constructor.module.css';
import { INCREASE_SUM_ORDER, CHANGE_BUNS_ITEM, INCREASE_ORDER, SWITCH_ING_ITEM, CHANGE_INGREDIENTS_ITEM, DELETE_ITEM, DECREASE_SUM_ORDER } from '../../constants/burger';
import { getOrder } from '../../services/actions';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import { urlApi } from '../../utils/context'
import { useDrop, useDrag } from "react-dnd";
import { useNavigate } from 'react-router-dom';
import { TOrder } from '../../types/generalTypes';
import { useSelector, useDispatch } from '../../types/hooks';

const urlOrders = urlApi + 'orders';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const dataOrders = useSelector(store => store.cartReducer.ingredientsNow);
    const sumState = useSelector(store => store.cartReducer.sumOrders);
    const orderNumber = useSelector(store => store.cartReducer.orderNumber);
    const [isOpen, setIsOpen] = React.useState(false);
    const [cards, setCards] = React.useState(dataOrders.ingredients);
    const navigate = useNavigate();
    const authorization = useSelector(store => store.authReducer.authorization);
    const [auth, setAuth] = React.useState(authorization);

    React.useEffect(() => {
        setCards(dataOrders.ingredients)
        setAuth(authorization);
        
        if (orderNumber.success) {
            return setIsOpen(true);
        } else
            return setIsOpen(false);
    })

    const handleClose = () => {
        orderNumber.success = false;
        return setIsOpen(false);
    }

    const handleOpen = () => {
        if (!auth)
         navigate('/login')
        else {
            let ingredients:Array<object> = [];
            Object.keys(dataOrders.ingredients).forEach(key => {
                ingredients.push(dataOrders.ingredients[key]._id);
            });
            // @ts-ignore - не знаю, как поправить
            dispatch(getOrder(urlOrders, { ingredients }));
        }
    }

    const [, dropIngredients] = useDrop({
        accept: "ingredients",
        drop(payload) {
             // @ts-ignore - не знаю, как поправить
            dispatch({
                type: CHANGE_INGREDIENTS_ITEM,
                payload
            });
             // @ts-ignore - не знаю, как поправить
            dispatch({ type: INCREASE_SUM_ORDER, payload });
        },
    })

    const [, dropTopBun] = useDrop({
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
    const [, dropBottomBun] = useDrop({
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

    // @ts-ignore
    const moveCard = React.useCallback((dragIndex, hoverIndex) =>
        dispatch({
            type: SWITCH_ING_ITEM,
            payload: { dragIndex, hoverIndex }
        })
    )

    const renderCard = React.useCallback((card: TOrder, index: number) => {
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
                                    // @ts-ignore -  подскажите пж, как это можно исправить
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
                        
                            {Object.entries(cards).map(([i, card]) =>
                            // @ts-ignore -  подскажите пж, как это можно исправить
                            renderCard(card, i)
                            )}
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
                                    // @ts-ignore -  подскажите пж, как это можно исправить
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
                <div className={style.size_icon + " pr-10 text text_type_digits-medium"}> {sumState} <CurrencyIcon type="primary" /> </div>
                <>
                    {Object.keys(dataOrders.bun).length !== 0 && Object.keys(dataOrders.ingredients).length !== 0 && (
                        <Button htmlType="button" type="primary" size="large" onClick={handleOpen}>
                            Оформить заказ
                        </Button>
                    )}
                </>
                {isOpen && <Modal title={''} onClose={handleClose} >
                    <OrderDetails />
                </Modal>}
            </div>
        </div>
    )
}

const MiddleOrder = ({ id, props, index, moveCard } : {id: number, props: TOrder, index: number, moveCard: any}) => {
    const dispatch = useDispatch();
    const ref = React.useRef(null)

    const [{ handlerId }, drop] = useDrop({
        accept: "ingredients2",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }
            
            // @ts-ignore - тоже не знаю, как исправить
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset: any | null = monitor.getClientOffset() 
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
                    isLocked={props.isLocked}
                    text={props.name}
                    price={props.price}
                    thumbnail={props.image_mobile}
                />
            </div>
        </div>
    )
}

const TopBun = ({ props, refBun } : {props: TOrder, refBun: any}) => {
    if (props.types === "top")
        return (
            <div ref={refBun} className={style.container + ' ' + style.padding_element} >
                <ConstructorElement
                    type={props.types}
                    isLocked={props.isLocked}
                    text={props.name}
                    price={props.price}
                    thumbnail={props.image_mobile}
                />
            </div>
        )
}

const BottomBun = ({ props, refBun } : {props: TOrder, refBun: any}) => {
    if (props.types === "bottom")
        return (
            <div ref={refBun} className={style.container + ' ' + style.padding_element} >
                <ConstructorElement
                    type={props.types}
                    isLocked={props.isLocked}
                    text={props.name}
                    price={props.price}
                    thumbnail={props.image_mobile}
                />
            </div>
        )
}

const handleOnClick = (props:TOrder, dispatch: any) => {
    dispatch({ type: DELETE_ITEM, payload: props });
    dispatch({ type: DECREASE_SUM_ORDER, payload: props });
}

export default BurgerConstructor;
