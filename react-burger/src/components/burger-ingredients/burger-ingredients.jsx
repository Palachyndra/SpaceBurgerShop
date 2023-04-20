import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-ingredients.module.css';
import { INCREASE_PRODUCT_ITEM } from '../../services/actions/burger.js';
import { ingredientType } from '../../utils/types.js'
import Modal from '../modal/modal'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useInView } from "react-intersection-observer";


const BurgerDataMenu = () => {
   const [current, setCurrent] = React.useState('bun');
   const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
   const [sauceRef, inViewSauce] = useInView({ threshold: 0 });
   const [mainRef, inViewMain] = useInView({ threshold: 0 });
   const burgerIngredients = useSelector(store => store.cartReducer.items.data);

   React.useEffect(() => {
      if (inViewBuns) {
         setCurrent("bun")
      } else if (inViewSauce) {
         setCurrent("sauce")
      } else if (inViewMain) {
         setCurrent("main")
      }
   })

   return (
      <div className={style.custom_scroll}>
         <div className="pt-10 pb-5 text text_type_main-large"> Соберите бургер </div>
         <div className={style.burger_ingredients_menu + " pb-10"} >
            <Tab active={current === 'bun'}> Булки </Tab>
            <Tab active={current === 'sauce'}> Соусы </Tab>
            <Tab active={current === 'main'} > Начинки </Tab>
         </div>
         <div className={style.size + " custom-scroll"}>
            <div ref={bunsRef} className="text text_type_main-medium"> Булки </div>
            <div className={style.burger_custom_container + " pt-6"}>
               {burgerIngredients.bun.map((prop) => {
                  return <MenuCreator key={prop._id} props={prop} />
               })}
            </div>
            <div ref={sauceRef} className="pt-2 pb-6 text text_type_main-medium"> Соусы </div>
            <div className={style.burger_custom_container}>
               {burgerIngredients.souce.map((prop) => {
                  return <MenuCreator key={prop._id} props={prop} />
               })}
            </div>
            <div ref={mainRef} className="pt-2 pb-6 text text_type_main-medium"> Начинки </div>
            <div className={style.burger_custom_container}>
               {burgerIngredients.main.map((prop) => {
                  return <MenuCreator key={prop._id} props={prop} />
               })}
            </div>
         </div>
      </div>
   );
}

const MenuCreator = ({ props }) => {
   const [isOpen, setIsOpen] = React.useState(false);

   const dispatch = useDispatch();
   const handleOpen = () => {
      setIsOpen(true);
      dispatch({ type: INCREASE_PRODUCT_ITEM, payload: props });
   }

   const burgerIngredients = useSelector(store => store.cartReducer.ingredientsNow);
   const [count, setIngredients] = React.useState(burgerIngredients);

   React.useEffect(() => {
      setIngredients(burgerIngredients);
   })

   const handleClose = () => {
      setIsOpen(false);
   }

   const [, dragRef] = useDrag((e) => e = {
      type: "buns",
      item: {
         bun: [{
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name,
            price: props.price,
            type: "top",
            isLocked: "true",
            typeClass: props.type,
            uuid: props._id + Math.floor(Math.random() * 100)
         },
         {
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name,
            price: props.price,
            type: "bottom",
            isLocked: "true",
            typeClass: props.type,
            uuid: props._id + Math.floor(Math.random() * 100)
         }]
      },
   })

   const [, dragRef2] = useDrag({
      type: "ingredients",
      item: {
         _id: props._id,
         image_mobile: props.image_mobile,
         name: props.name,
         price: props.price,
         typeClass: props.type,
         uuid: props._id + Math.floor(Math.random() * 100)
      },
   })

   return (
      <div ref={props.type === "bun" ? dragRef : dragRef2} className={style.burger_custom_container_ingredients + " pl-4 pr-6 pb-8"} >
         <div className={style.up_counter}>
            {props.count ? <Counter count={props.count} size="default" /> : ''}
         </div>
         <img className="pl-4" src={props.image} alt={props.name} onClick={handleOpen} />
         <div className={style.burger_custom_container_ingredients_text}>
            <div className="text text_type_digits-default pr-2 pt-1 pb-1"> {props.price} </div>
            <CurrencyIcon type="primary" />
         </div>
         <div className="text text_type_main-default"> {props.name} </div>
         {isOpen && <Modal title={'Детали ингредиента'} onClose={handleClose} >
            <IngredientDetails />
         </Modal>}
      </div>
   );
}


MenuCreator.propTypes = { burgerIngredients: ingredientType, };
BurgerDataMenu.propTypes = PropTypes.shape({ burgerIngredients: ingredientType }).isRequired;

export default BurgerDataMenu;
