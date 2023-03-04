import React from 'react';
import PropTypes from 'prop-types';
import './burger-constructor.css';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import datafile from '../../utils/order.js'


function sumOrder(data) {
    let sumPrice = 0;
    data.order.map(price => sumPrice = sumPrice + price.price);
    return sumPrice;
}
   
const BurgerConstructor = () => {
   const data = datafile;
   let sumPrice = sumOrder(data);

   return (
        <>
        <div className="ml-10 pb-10">
            <div className="max-height custom-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '4px' }}>
                {
                    data.order.map((prop, i) => {
                        return (
                        <ConstructorElement 
                            key={i} 
                            type={prop.type}
                            isLocked={prop.isLocked}
                            text={prop.name}
                            price={prop.price}
                            thumbnail={prop.image_mobile}
                        />
                        )
                    })
                }
            </div>
            <div className="container pt-10">
                <div className="pr-10 text text_type_digits-medium"> {sumPrice} <CurrencyIcon className="size-icon" type="primary"/> </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
        </>
    )
}

ConstructorElement.propTypes =
   {
      data: PropTypes.arrayOf ({
         _id: PropTypes.string.isRequired,
         image_mobile: PropTypes.string.isRequired,
         name: PropTypes.string.isRequired,
         price: PropTypes.string.isRequired,
         type: PropTypes.number.isRequired,
         isLocked: PropTypes.string.isRequired,
      }),
   };

export default BurgerConstructor;
