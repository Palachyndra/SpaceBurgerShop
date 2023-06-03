import React, { FC } from 'react';
import styles from './login.module.css'
import { useNavigate } from "react-router-dom";
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { urlApi } from '../utils/context'
import { checkResponseExport } from '../services/actions/index';


export const Registration: FC = () => {
  const [nameValue, setNameValue] = React.useState<string>('')
  const [passwordValue, setPasswordValue] = React.useState<string>('')
  const [emailValue, setEmailValue] = React.useState<string>('')
  const navigate = useNavigate();

  function onClick() {
    navigate('/login');
  }

  function onClickCreate() {
    createNewAccount()
      .then((res) => {
        if (res.success) navigate('/profile');
      })
  }

  const createNewAccount = () => {
    const url:string = urlApi + "auth/register";
    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        name: nameValue
      })
    }).then((checkResponseExport));
  }

  return (
    <div className={styles.container}>
      <div className="text text_type_main-medium pb-6"> Регистрация </div>
      <div className={styles.container_box}>
        <form>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNameValue(e.target.value)}
            value={nameValue}
            size={'default'}
            extraClass="pb-6"
          />
          <EmailInput
            onChange={e => setEmailValue(e.target.value)}
            value={emailValue}
            placeholder='Укажите e-mail'
            isIcon={false}
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
        <Button htmlType="button" type="primary" size="medium" onClick={onClickCreate}>
          Зарегистрироваться
        </Button>
      </div>
      <div className="text text_type_main-default text_color_inactive"> Уже зарегистрированы? <span className={styles.text_color} onClick={onClick}> Войти </span> </div>
    </div>
  );
}