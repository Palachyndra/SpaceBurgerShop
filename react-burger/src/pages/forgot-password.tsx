import React, { FC } from 'react';
import styles from './login.module.css'
import { useNavigate } from "react-router-dom";
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { urlApi } from '../utils/context'
import { TReset } from '../types/generalTypes';
import { checkResponseExport } from '../services/actions';

export const ForgotPassword: FC = () => {
  const [value, setValue] = React.useState<string>('')
  const navigate = useNavigate();

  const postData = () => {
    const email:string = value;
    const url:string = urlApi + "password-reset";
    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email })
    }).then((checkResponseExport));
  }

  function onClick() {
    navigate('/login');
  }

  function onClickReset() {
    postData()
      .then((res: TReset) => {
        if (res.success) navigate('/reset-password');
      })
  }

  return (
    <div className={styles.container}>
      <div className="text text_type_main-medium pb-6"> Восстановление пароля </div>
      <div className={styles.container_box}>
        <form>
          <EmailInput
            onChange={e => setValue(e.target.value)}
            value={value}
            placeholder='Укажите e-mail'
            isIcon={false}
            extraClass="pb-6"
          />
        </form>
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