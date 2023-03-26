import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-ingredients.module.css';
import ingredientType from '../../utils/types.js'
import Modal from '../modal/modal'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details'
import { DataSumOrder } from '../../utils/context.js'
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const BurgerDataMenu = ({ burgerIngredients }) => {
   const [current, setCurrent] = React.useState('bun');

   const makeScroll = (value) => {
      let element = document.getElementById(value);
      setCurrent(value);
      element.scrollIntoView(value);
   }

   return (
      <div className={style.custom_scroll}>
         <div className="pt-10 pb-5 text text_type_main-large"> Соберите бургер </div>
         <div className={style.burger_ingredients_menu + " pb-10"} >
            <Tab value="bun" active={current === 'bun'} onClick={makeScroll}> Булки </Tab>
            <Tab value="souce" active={current === 'souce'} onClick={makeScroll}> Соусы </Tab>
            <Tab value="main" active={current === 'main'} onClick={makeScroll}> Начинки </Tab>
         </div>
         <DndProvider backend={HTML5Backend}>
            <div className={style.size + " custom-scroll"}>
               <div className="text text_type_main-medium" id="bun"> Булки </div>
               <div className={style.burger_custom_container + " pt-6"}>
                  {burgerIngredients.bun.map((prop, index) => {
                     return <MenuCreator key={prop._id + index} props={prop} />
                  })}
               </div>
               <div className="pt-2 pb-6 text text_type_main-medium" id="souce"> Соусы </div>
               <div className={style.burger_custom_container}>
                  {burgerIngredients.souce.map((prop, index) => {
                     return <MenuCreator key={prop._id + index} props={prop} />
                  })}
               </div>
               <div className="pt-2 pb-6 text text_type_main-medium" id="main"> Начинки </div>
               <div className={style.burger_custom_container}>
                  {burgerIngredients.main.map((prop, index) => {
                     return <MenuCreator key={prop._id + index} props={prop} />
                  })}
               </div>
            </div>
         </DndProvider>
      </div>
   );
}

const MenuCreator = ({ props }) => {
   const [isOpen, setIsOpen] = React.useState(false);
   const { sumDispatcher } = React.useContext(DataSumOrder);

   const dispatch = useDispatch();
   const dataOrders = useSelector(store => store.cartReducer.ingredientsNow);
   const dataProductNow = useSelector(store => store.cartReducer.productNow);

   const chechIngredients = () => {
      const randomInt = Math.floor(Math.random() * 100);
      const uuid = props._id + randomInt;
      var arrDataOrders = {};

      if (props.type === "bun") {
         arrDataOrders = [{
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name,
            price: props.price,
            type: "top",
            isLocked: "true",
            typeClass: props.type,
            uuid
         },
         {
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name,
            price: props.price,
            type: "bottom",
            isLocked: "true",
            typeClass: props.type,
            uuid
         }
         ]
      } else {
         arrDataOrders = [{
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name,
            price: props.price,
            typeClass: props.type,
            uuid
         },]
      }
      const arrReturn = dataOrders.data ? Array.from(dataOrders.data).concat(arrDataOrders) : arrDataOrders;
      return arrReturn;
   }

   const [, dragRef] = useDrag({
      type: "sauce",
      item: chechIngredients(),
   })


   const handleClose = () => {
      props.count++
      const arrReturn = chechIngredients();
      setIsOpen(false);
      sumDispatcher({ type: "increment", payload: arrReturn });
      dispatch({ type: "INCREASE_PRODUCT_ITEM", payload: {} });

      return dispatch({ type: "INCREASE_ITEM", payload: arrReturn });
   }

   const handleOpen = () => {
      setIsOpen(true);
      dispatch({ type: "INCREASE_PRODUCT_ITEM", payload: props });

      if (Object.keys(dataOrders).length !== 0 && props.type === "bun") {
         props.count = 0;
         return dataOrders.data =
            dataOrders.data.filter((item) => item.type !== "top" && item.type !== "bottom");
      }
   }

   return (
      <div ref={dragRef} className={style.burger_custom_container_ingredients + " pl-4 pr-6 pb-8"} >
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
            <IngredientDetails data={dataProductNow.data} />
         </Modal>}
      </div>
   );
}


const BurgerIngredients = ({ dataBurgers }) => {
   return (
      <BurgerDataMenu burgerIngredients={dataBurgers.data} />
   );
};

MenuCreator.propTypes = { burgerIngredients: ingredientType, };
BurgerDataMenu.propTypes = PropTypes.shape({ burgerIngredients: ingredientType }).isRequired;

export default BurgerIngredients;
