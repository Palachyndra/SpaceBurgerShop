import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './app-header.css';

function AppHeader() {
   return (
    <>
      <header className="header">
         <div className="container">
            <div className="mini-container pl-5 pr-2 pb-4 pt-4">
               <BurgerIcon type="primary" /> 
               <div className='pl-2 text text_type_main-default'>  Конструктор  </div>
            </div>
            <div className="mini-container pl-5 pr-2 pb-4 pt-4">
               <ListIcon type="secondary" /> 
               <div className='pl-2 text text_type_main-default text_color_inactive'>  Лента заказов  </div>
            </div>
         </div>
         <Logo />
         <div className="container">
            <div className="mini-container pl-5 pr-2 pb-4 pt-4">
               <ProfileIcon type="secondary" /> 
               <div className='pl-2 text text_type_main-default text_color_inactive'>  Личный кабинет  </div>
            </div>
         </div>
      </header>
   </>
   );
}

  export default AppHeader;  