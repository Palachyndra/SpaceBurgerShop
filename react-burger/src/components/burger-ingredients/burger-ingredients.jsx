import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './burger-ingredients.css';
import datafile from '../../utils/data.js'
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerDataMenu = props => {
    const [current, setCurrent] = React.useState('bun');

   return (
     <>
      <div className="custom-scroll">
         <div className="pt-10 pb-5 text text_type_main-large"> Соберите бургер </div>
         <div className="burger-ingredients-menu pb-10">
               <Tab value="bun" active={current === 'bun'} onClick={setCurrent}> Булки </Tab>
               <Tab value="souce" active={current === 'souce'} onClick={setCurrent}> Соусы </Tab>
               <Tab value="main" active={current === 'main'} onClick={setCurrent}> Начинки </Tab>
         </div>
         <div className="size custom-scroll">   
            <div className="text text_type_main-medium"> Булки </div>
            <div className="pt-6 burger-custom-container"> 
               {props.bun.map((prop, i) => {
                  return <MenuCreator key={i} props={prop}/>
               })}
            </div>
            <div className="pt-2 pb-6 text text_type_main-medium"> Соусы </div>
            <div className="burger-custom-container"> 
               {props.souce.map((prop, i) => { 
                  return <MenuCreator key={i} props={prop}/>
               })}
            </div>
            <div className="pt-2 pb-6 text text_type_main-medium"> Начинки </div>
            <div className="burger-custom-container"> 
               {props.main.map((prop, i) => { 
                  return <MenuCreator key={i} props={prop}/>
               })}
            </div>
         </div>  
      </div>
      </>
   );
 }

 const MenuCreator = ({props}) => {
   const [count, setCount] = useState(0);

   const incrementCount = () => {
      setCount(count + 1);
   };
    
   return (
      <> 
         <div className="burger-custom-container-ingredients pl-4 pr-6 pb-8" onClick={incrementCount}>
            <div className='up-counter'>
            { count !== 0 ? <Counter count={count} size="default" /> : '' } 
            </div>
            <img className="pl-4" src={props.image} alt=""/>
            <div className="burger-custom-container-ingredients-text">
               <div className="text text_type_digits-default pr-2 pt-1 pb-1"> {props.price} </div>
               <CurrencyIcon type="primary" />
            </div>
            <div className="text text_type_main-default"> {props.name} </div>
         </div>
      </>
   );
 }


 const BurgerIngredients = () => {
   const data = datafile;
   return (
     <BurgerDataMenu {...data} />
   );
 };

 MenuCreator.propTypes =
   {
      data: PropTypes.arrayOf ({
         _id: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired,
         proteins: PropTypes.number.isRequired,
         fat: PropTypes.number.isRequired,
         carbohydrates: PropTypes.number.isRequired,
         calories: PropTypes.number.isRequired,
         price: PropTypes.string.isRequired,
         image: PropTypes.string.isRequired,
         image_mobile: PropTypes.string.isRequired,
         image_large: PropTypes.string.isRequired,
         __v: PropTypes.number.isRequired,
      }),
   };

export default BurgerIngredients;
