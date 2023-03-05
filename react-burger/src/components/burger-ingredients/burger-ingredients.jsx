import React, { useState } from 'react';
import style from './burger-ingredients.module.css';
import datafile from '../../utils/data.js'
import ingredientType from '../../utils/types.js'
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerDataMenu = props => {
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
               {props.bun.map((prop) => {
                  return <MenuCreator key={prop._id} props={prop}/>
               })}
            </div>
            <div className="pt-2 pb-6 text text_type_main-medium"> Соусы </div>
            <div className={style.burger_custom_container}> 
               {props.souce.map((prop) => { 
                  return <MenuCreator key={prop._id} props={prop}/>
               })}
            </div>
            <div className="pt-2 pb-6 text text_type_main-medium"> Начинки </div>
            <div className={style.burger_custom_container}> 
               {props.main.map((prop) => { 
                  return <MenuCreator key={prop._id} props={prop}/>
               })}
            </div>
         </div>  
      </div>
   );
 }

 const MenuCreator = ({props}) => {
   const [count, setCount] = useState(0);

   const incrementCount = () => {
      setCount(count + 1);
   };
    
   return (
         <div className={style.burger_custom_container_ingredients + " pl-4 pr-6 pb-8"} onClick={incrementCount}>
            <div className={style.up_counter}>
            { count !== 0 ? <Counter count={count} size="default" /> : '' } 
            </div>
            <img className="pl-4" src={props.image} alt={props.name} />
            <div className={style.burger_custom_container_ingredients_text}>
               <div className="text text_type_digits-default pr-2 pt-1 pb-1"> {props.price} </div>
               <CurrencyIcon type="primary" />
            </div>
            <div className="text text_type_main-default"> {props.name} </div>
         </div>
   );
 }


 const BurgerIngredients = () => {
   const data = datafile;
   return (
     <BurgerDataMenu {...data} />
   );
 };

 MenuCreator.propTypes = { props: ingredientType, };

export default BurgerIngredients;
