import React from 'react';
import styles from './login.module.css'
import { useNavigate } from "react-router-dom";
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { urlApi } from '../utils/context.js'

export function ResetPassword() {
    const [value, setValue] = React.useState('');
    const [valueInput, setValueInput] = React.useState('');
    const navigate = useNavigate();

    function onClick() {
        navigate('/login');
    }

    const postData = () => {
        const url = urlApi + "password-reset/reset";
        return fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: value, token: valueInput })
        }).then((checkResponse));
    }

    function onClickReset() {
        postData()
            .then((res) => {
                if (res.success) navigate('/login');
            })
    }

    const checkResponse = (res) => {
        if (res.ok) {
            return res.json();
        } else
            return Promise.reject(`Ошибка ${res.status}`);
    }

    return (
        <div className={styles.container}>
            <div className="text text_type_main-medium pb-6"> Вход </div>
            <div className={styles.container_box}>
                <PasswordInput
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    name={'password'}
                    extraClass="pb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setValueInput(e.target.value)}
                    value={valueInput}
                    size={'default'}
                    extraClass="pb-6"
                />
            </div>
            <div className="pb-20">
                <Button htmlType="button" type="primary" size="medium" onClick={onClickReset}>
                    Сохранить
                </Button>
            </div>
            <div className="text text_type_main-default text_color_inactive"> Вспомнили пароль? <span className={styles.text_color} onClick={onClick}> Войти </span> </div>
        </div>
    );
}