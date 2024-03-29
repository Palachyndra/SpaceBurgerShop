import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';
import { useSelector } from '../../types/hooks';

function AppHeader() {
   const location = useLocation();
   const navigate = useNavigate();

   const authorization = useSelector(store => store.authReducer.authorization);
   const [auth, setAuth] = React.useState<boolean>(authorization);

   React.useEffect(() => {
       setAuth(authorization);
   })

   const onClick = () => {
      if (auth) navigate('/profile')
         else navigate('/login')
   }

   return (
      <header className={style.header}>
         <div className={style.container}>
            <div className={style.mini_container + " pl-5 pr-2 pb-4 pt-4"} >
               <BurgerIcon type={location.pathname !== '/' ? "secondary" : "primary"} />
               <div className={'pl-2 text text_type_main-default ' + (location.pathname !== '/' && 'text_color_inactive')} onClick={() => navigate('/')}> Конструктор </div>
            </div>
            <div className={style.mini_container + " pl-5 pr-2 pb-4 pt-4"}>
               <ListIcon type={location.pathname !== '/feed' ? "secondary" : "primary"} />
               <div className={'pl-2 text text_type_main-default '  + (!location.pathname.includes('/feed') && ' text_color_inactive')} onClick={() => navigate('/feed')}>  Лента заказов  </div>
            </div>
         </div>
         <Logo />
         <div className={style.container}>
            <div className={style.mini_container + " pl-5 pr-2 pb-4 pt-4"}>
               <ProfileIcon type={!location.pathname.includes('/profile') ? "secondary" : "primary"} />
               <div className={'pl-2 text text_type_main-default ' + (!location.pathname.includes('/profile') && 'text_color_inactive')} onClick={onClick}>  Личный кабинет  </div>
            </div>
         </div>
      </header>
   );
}

export default AppHeader;  