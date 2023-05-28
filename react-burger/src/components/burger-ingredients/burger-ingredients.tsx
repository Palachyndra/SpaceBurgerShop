import React, { ReactNode } from 'react';
import style from './burger-ingredients.module.css';
import { INCREASE_PRODUCT_ITEM } from '../../services/actions/burger.js';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from 'react-router-dom';
import { TStoreBurgerData } from '../../types/generalTypes'

const BurgerDataMenu = () => {
   const [current, setCurrent] = React.useState<string>('bun');
   const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
   const [sauceRef, inViewSauce] = useInView({ threshold: 0 });
   const [mainRef, inViewMain] = useInView({ threshold: 0 });
   // @ts-ignore
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
   const refs = [
      {
         tab: "bun",
         ref: React.useRef<HTMLHeadingElement>(null),
      },
      {
         tab: "sauce",
         ref: React.useRef<HTMLHeadingElement>(null),
      },
      {
         tab: "main",
         ref: React.useRef<HTMLHeadingElement>(null),
      },
   ];

   const tabClick = (tab: string) => {
      refs.find((item) => item.tab === tab)?.ref.current?.scrollIntoView();
   };
   return (
      <div className={style.custom_scroll}>
         <div className="pt-10 pb-5 text text_type_main-large"> Соберите бургер </div>
         <div className={style.burger_ingredients_menu + " pb-10"} >
            <Tab
               value="bun"
               active={current === "bun"}
               onClick={() => tabClick("bun")} >
               Булки
            </Tab>
            <Tab
               value="sauce"
               active={current === "sauce"}
               onClick={() => tabClick("sauce")} >
               Соусы
            </Tab>
            <Tab
               value="main"
               active={current === "main"}
               onClick={() => tabClick("main")} >
               Начинки
            </Tab>
         </div>
         <div className={style.size + " custom-scroll"}>
            <div ref={bunsRef} className="text text_type_main-medium"> Булки </div>
            <div className={style.burger_custom_container + " pt-6"}>
               {burgerIngredients.bun.map((prop: TStoreBurgerData ) => {
                  return <MenuCreator key={prop._id} props={prop} />
               })}
            </div>
            <div ref={sauceRef} className="pt-2 pb-6 text text_type_main-medium"> Соусы </div>
            <div className={style.burger_custom_container}>
               {burgerIngredients.souce.map((prop: TStoreBurgerData ) => {
                  return <MenuCreator key={prop._id} props={prop} />
               })}
            </div>
            <div ref={mainRef} className="pt-2 pb-6 text text_type_main-medium"> Начинки </div>
            <div className={style.burger_custom_container}>
               {burgerIngredients.main.map((prop: TStoreBurgerData ) => {
                  return <MenuCreator key={prop._id} props={prop} />
               })}
            </div>
         </div>
      </div>
   );
}

const MenuCreator = ({ props }: { props: TStoreBurgerData }) => {
   const location = useLocation();
   const dispatch = useDispatch();
   const handleOpen = () => {
      dispatch({ type: INCREASE_PRODUCT_ITEM, payload: props });
   }

   // @ts-ignore
   const burgerIngredients = useSelector(store => store.cartReducer.ingredientsNow);
   const [count, setIngredients] = React.useState(burgerIngredients);

   React.useEffect(() => {
      setIngredients(burgerIngredients);
   })

   const [, dragRef] = useDrag({
      type: "buns",
      item: {
         bun: [{
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name + " (верх)",
            price: props.price,
            types: "top",
            isLocked: "true",
            typeClass: props.type,
            uuid: props._id + Math.floor(Math.random() * 100)
         },
         {
            _id: props._id,
            image_mobile: props.image_mobile,
            name: props.name + " (низ)",
            price: props.price,
            types: "bottom",
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
      <Link to={`/ingredients/${props._id}`} state={{ background: location }}>
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
         </div>
      </Link>
   );
}

export default BurgerDataMenu;
