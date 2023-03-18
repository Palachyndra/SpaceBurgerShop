import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './burger-ingredients.module.css';
import ingredientType from '../../utils/types.js'
import Modal from '../modal/modal'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details'
import { DataContext, DataOrder, DataSumOrder } from '../../utils/context.js'

const BurgerDataMenu = ({ burgerIngredients }) => {
   const [current, setCurrent] = React.useState('bun');

   return (
      <div className={style.custom_scroll}>
         <div className="pt-10 pb-5 text text_type_main-large"> Соберите бургер </div>
         <div className={style.burger_ingredients_menu + " pb-10"}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}> Булки </Tab>
            <Tab value="souce" active={current === 'souce'} onClick={setCurrent}> Соусы </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}> Начинки </Tab>
         </div>
         <div className={style.size + " custom-scroll"}>
            <div className="text text_type_main-medium"> Булки </div>
            <div className={style.burger_custom_container + " pt-6"}>
               {burgerIngredients.bun.map((prop, index) => {
                  return <MenuCreator key={prop._id + index} props={prop} />
               })}
            </div>
            <div className="pt-2 pb-6 text text_type_main-medium"> Соусы </div>
            <div className={style.burger_custom_container}>
               {burgerIngredients.souce.map((prop, index) => {
                  return <MenuCreator key={prop._id + index} props={prop} />
               })}
            </div>
            <div className="pt-2 pb-6 text text_type_main-medium"> Начинки </div>
            <div className={style.burger_custom_container}>
               {burgerIngredients.main.map((prop, index) => {
                  return <MenuCreator key={prop._id + index} props={prop} />
               })}
            </div>
         </div>
      </div>
   );
}

const MenuCreator = ({ props }) => {
   const [count, setCount] = useState(0);
   const [isOpen, setIsOpen] = React.useState(false);
   const { dataOrders, setDataOrders } = React.useContext(DataOrder);
   const { sumDispatcher } = React.useContext(DataSumOrder);

   Object.assign(props, props, { count: count });

   const handleClose = () => {
      setCount(count + 1);
      var arrDataOrders = {};

      if (props.type === "bun") {
         arrDataOrders = [{
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name,
            price: props.price,
            type: "top",
            isLocked: "true"
         },
         {
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name,
            price: props.price,
            type: "bottom",
            isLocked: "true"
         }
         ];
      } else {
         arrDataOrders = [{
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name,
            price: props.price,
         },]
      }

      const arrReturn = Array.from(dataOrders).concat(arrDataOrders);
      sumDispatcher({ type: "increment", payload: arrReturn });
      setIsOpen(false);
      return setDataOrders(arrReturn);
   }

   const handleOpen = () => {
      setIsOpen(true);
      if (Object.keys(dataOrders).length !== 0 && props.type === "bun") {

         // Доделать счетчик
         // props.count = setCount(0);
         // const id = dataOrders[0]._id.split('-')[0];
         // const found = () => test222(id);
         // console.log(found);


         return setDataOrders((items) =>
            items.filter((item) => item.type !== "top" && item.type !== "bottom"));
      }
   }


   return (
      <div className={style.burger_custom_container_ingredients + " pl-4 pr-6 pb-8"} >
         <div className={style.up_counter}>
            {props.count ? <Counter count={count} size="default" /> : ''}
         </div>
         <img className="pl-4" src={props.image} alt={props.name} onClick={handleOpen} />
         <div className={style.burger_custom_container_ingredients_text}>
            <div className="text text_type_digits-default pr-2 pt-1 pb-1"> {props.price} </div>
            <CurrencyIcon type="primary" />
         </div>
         <div className="text text_type_main-default"> {props.name} </div>
         {isOpen && <Modal title={'Детали ингредиента'} onClose={handleClose} >
            <IngredientDetails data={props} />
         </Modal>}
      </div>
   );
}


const BurgerIngredients = () => {
   const { dataBurgers } = React.useContext(DataContext);

   return (
      <BurgerDataMenu burgerIngredients={dataBurgers.data} />
   );
};

MenuCreator.propTypes = { burgerIngredients: ingredientType, };
BurgerDataMenu.propTypes = PropTypes.shape({ burgerIngredients: ingredientType }).isRequired;

export default BurgerIngredients;
