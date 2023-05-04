import React from 'react';
import styles from './login.module.css'
import { useNavigate } from "react-router-dom";
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPassword() {
    const [value, setValue] = React.useState('')
    const navigate = useNavigate();

    const onChange = e => {
      setValue(e.target.value)
    }

    function onClick() {
        navigate('/login');
    }
    
  return (
    <div className={styles.container}>
        <div className="text text_type_main-medium pb-6"> Восстановление пароля </div>
        <div className={styles.container_box}>
        <EmailInput
            onChange={onChange}
            value={value}
            placeholder='Укажите e-mail'
            isIcon={false}
            extraClass="pb-6"
        />
        </div>
        
        <div className="text text_type_main-default text_color_inactive"> Вспомнили пароль? <span className={styles.text_color} onClick={onClick}> Войти </span> </div>
    </div>
  );
}