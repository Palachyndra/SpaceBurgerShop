import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './login.module.css'
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function Login() {
    const [value, setValue] = React.useState('')
    const [valueInput, setValueInput] = React.useState('')
    const navigate = useNavigate();

    function onClickRegistration() {
        navigate('/registration');
    }
    function onClickForgotPassword() {
        navigate('/forgot-password');
    }
    

    const onChange = e => {
      setValue(e.target.value)
    }
    
  return (
    <div className={styles.container}>
        <div className="text text_type_main-medium pb-6"> Вход </div>
        <div className={styles.container_box}>
            <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={e => setValueInput(e.target.value)}
                value={valueInput}
                size={'default'}
                extraClass="pb-6"
            />
            <PasswordInput
                onChange={onChange}
                value={value}
                name={'password'}
                extraClass="pb-6"
             />
        </div>
        <div className="pb-20">
            <Button htmlType="button" type="primary" size="medium">
                    Войти
            </Button>
        </div>
        <div className="text text_type_main-default text_color_inactive"> Вы — новый пользователь? <span className={styles.text_color} onClick={onClickRegistration}> Зарегистрироваться </span> </div>
        <div className="text text_type_main-default text_color_inactive"> Забыли пароль? <span className={styles.text_color} onClick={onClickForgotPassword}> Восстановить пароль </span> </div>
    </div>
  );
}