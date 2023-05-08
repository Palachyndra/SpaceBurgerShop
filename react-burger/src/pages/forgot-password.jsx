import React from 'react';
import styles from './login.module.css'
import { useNavigate } from "react-router-dom";
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { urlApi } from '../utils/context.js'

export function ForgotPassword() {
  const [value, setValue] = React.useState('')
  const navigate = useNavigate();

  const postData = () => {
    const email = value;
    const url = urlApi + "password-reset";
    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email })
    }).then((checkResponse));
  }

  function onClick() {
    navigate('/login');
  }

  function onClickReset() {
    postData()
      .then((res) => {
        if (res.success) navigate('/reset-password');
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
      <div className="text text_type_main-medium pb-6"> Восстановление пароля </div>
      <div className={styles.container_box}>
        <EmailInput
          onChange={e => setValue(e.target.value)}
          value={value}
          placeholder='Укажите e-mail'
          isIcon={false}
          extraClass="pb-6"
        />
      </div>
      <div className="pb-20">
        <Button htmlType="button" type="primary" size="medium" onClick={onClickReset}>
          Восстановить
        </Button>
      </div>
      <div className="text text_type_main-default text_color_inactive"> Вспомнили пароль? <span className={styles.text_color} onClick={onClick}> Войти </span> </div>
    </div>
  );
}