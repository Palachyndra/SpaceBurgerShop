import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';

function AppHeader() {
   return (
      <header className={style.header}>
         <div className={style.container}>
            <div className={style.mini_container + " pl-5 pr-2 pb-4 pt-4"} >
               <BurgerIcon type="primary" /> 
               <div className='pl-2 text text_type_main-default'> Конструктор </div>
            </div>
            <div className={style.mini_container + " pl-5 pr-2 pb-4 pt-4"}>
               <ListIcon type="secondary" /> 
               <div className='pl-2 text text_type_main-default text_color_inactive'>  Лента заказов  </div>
            </div>
         </div>
         <Logo />
         <div className={style.container}>
            <div className={style.mini_container +" pl-5 pr-2 pb-4 pt-4"}>
               <ProfileIcon type="secondary" /> 
               <div className='pl-2 text text_type_main-default text_color_inactive'>  Личный кабинет  </div>
            </div>
         </div>
      </header>
   );
}

  export default AppHeader;  