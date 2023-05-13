import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './login.module.css'
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { urlApi } from '../utils/context.js'
import { GET_TOKEN, GET_AUTH } from '../services/actions/authorization.js';
import { useDispatch } from 'react-redux';
import { checkResponseExport } from '../services/actions/index.js';


export function Login() {
    const [emailValue, setEmailValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onClickRegistration() {
        navigate('/registration');
    }

    function onClickForgotPassword() {
        navigate('/forgot-password');
    }

    function onClickAuthorization() {
        loginAuthorization()
            .then((res) => {
                dispatch({
                    type: GET_TOKEN,
                    payload: res
                });
                dispatch({
                    type: GET_AUTH,
                    payload: res
                });
                if (res.success) {
                    let date = new Date(Date.now() + 1200e3)
                    document.cookie = `accessToken=${res.accessToken}; expires=${date}`
                    document.cookie = `refreshToken=${res.refreshToken}`
                    navigate('/')
                };
            })
    }

    const loginAuthorization = () => {
        const url = urlApi + "auth/login";
        return fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
            })
        }).then((checkResponseExport));
    }

    return (
        <div className={styles.container}>
            <div className="text text_type_main-medium pb-6"> Вход </div>
            <div className={styles.container_box}>
                <form>
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        onChange={e => setEmailValue(e.target.value)}
                        value={emailValue}
                        size={'default'}
                        extraClass="pb-6"
                    />
                    <PasswordInput
                        onChange={e => setPasswordValue(e.target.value)}
                        value={passwordValue}
                        name={'password'}
                        extraClass="pb-6"
                    />
                </form>
            </div>
            <div className="pb-20">
                <Button htmlType="button" type="primary" size="medium" onClick={onClickAuthorization}>
                    Войти
                </Button>
            </div>
            <div className="text text_type_main-default text_color_inactive"> Вы — новый пользователь? <span className={styles.text_color} onClick={onClickRegistration}> Зарегистрироваться </span> </div>
            <div className="text text_type_main-default text_color_inactive"> Забыли пароль? <span className={styles.text_color} onClick={onClickForgotPassword}> Восстановить пароль </span> </div>
        </div>
    );
}