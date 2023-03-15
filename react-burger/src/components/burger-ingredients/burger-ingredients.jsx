import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './burger-ingredients.module.css';
import ingredientType from '../../utils/types.js'
import Modal from '../modal/modal'
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details'

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
               {burgerIngredients.bun.map((prop) => {
                  return <MenuCreator key={prop._id} props={prop} />
               })}
            </div>
            <div className="pt-2 pb-6 text text_type_main-medium"> Соусы </div>
            <div className={style.burger_custom_container}>
               {burgerIngredients.souce.map((prop) => {
                  return <MenuCreator key={prop._id} props={prop} />
               })}
            </div>
            <div className="pt-2 pb-6 text text_type_main-medium"> Начинки </div>
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
   const [count, setCount] = useState(0);
   const [isOpen, setIsOpen] = React.useState(false);

   const handleClose = () => {
      setCount(count + 1);
      return setIsOpen(false);
   }
   const handleOpen = () => {
      return setIsOpen(true);
   }


   return (
      <div className={style.burger_custom_container_ingredients + " pl-4 pr-6 pb-8"} >
         <div className={style.up_counter}>
            {count ? <Counter count={count} size="default" /> : ''}
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


const BurgerIngredients = ({ burgerIngredients }) => {
   return (
      <BurgerDataMenu burgerIngredients={burgerIngredients} />
   );
};

MenuCreator.propTypes = { burgerIngredients: ingredientType, };
BurgerDataMenu.propTypes = PropTypes.shape({ burgerIngredients: ingredientType }).isRequired;

export default BurgerIngredients;
