import React from 'react';
import styles from './login.module.css'
import { EmailInput, Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { urlApi } from '../utils/context.js';
import { authorization } from '../services/actions/index'
import { useNavigate } from "react-router-dom";
import { EXIT_AUTH } from '../services/actions/authorization.js';


export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorizationData = useSelector(store => store.authReducer);
  const [auth, setAuth] = React.useState(authorizationData);

  React.useEffect(() => {
    setAuth(authorizationData);
  })
  const oldName = auth.authorizationName;
  const oldEmail = auth.authorizationEmail;
  const oldPassword = auth.authorizationPassword;

  const [nameValue, setNameValue] = React.useState(auth.authorizationName);
  const [emailValue, setEmailValue] = React.useState(auth.authorizationEmail);
  const [passwordValue, setPasswordValue] = React.useState(auth.authorizationPassword);
  const [current, setCurrent] = React.useState('profile');

  const cancelClick = () => {
    setNameValue(oldName)
    setEmailValue(oldEmail)
    setPasswordValue(oldPassword)
  }

  const onClickUpdate = () => {
    updateAccount()
      .then((res) => {
        if (res.success) {
          dispatch(authorization());
          setNameValue(res.user.name)
          setEmailValue(res.user.email)
        }
      })
  }

  const updateAccount = () => {
    const url = urlApi + "auth/user";
    const token = getCookie('accessToken');
    return fetch(url, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
      }),
    }).then((checkResponse));
  }

  const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else
      return Promise.reject(`Ошибка ${res.status}`);
  }

  const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const onClickExit = () => {
    const url = urlApi + "auth/logout";
    const token = getCookie('refreshToken');
    setCurrent('exit');

    return fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token: token}),
    }).then((checkResponse))
      .then((res) => {
        if (res.success) {
          document.cookie = "refreshToken=''; max-age=-1";
          document.cookie = "accessToken=''; max-age=-1";
          dispatch({
            type: EXIT_AUTH,
            payload: false
          });
          navigate('/login');
        };
      })
  }

  return (
    <div className={styles.container_row}>
      <div>
        <div className={"text text_type_main-medium pb-6 " + (current !== 'profile' && 'text text_type_main-default text_color_inactive')} onClick={() => setCurrent('profile')}> Профиль </div>
        <div className={"text text_type_main-medium pb-6 " + (current !== 'history' && 'text text_type_main-default text_color_inactive')} onClick={() => setCurrent('history')}> История заказов </div>
        <div className={"text text_type_main-medium pb-6 " + (current !== 'exit' && 'text text_type_main-default text_color_inactive')} onClick={onClickExit}> Выход </div>
      </div>
      <div className={styles.container_box}>
        <Input className='text input__textfield text_type_main-default input__textfield-disabled'
          onChange={e => setNameValue(e.target.value)}
          value={nameValue}
          placeholder={'Имя'}
          type={'text'}
          icon={'EditIcon'}
          extraClass="pb-6"
        />
        <EmailInput
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          placeholder='Логин'
          isIcon={true}
          extraClass="pb-6"
        />
        <PasswordInput
          onChange={e => setPasswordValue(e.target.value)}
          value={passwordValue}
          placeholder={'Пароль'}
          name={'text'}
          icon={'EditIcon'}
          extraClass="pb-6"
        />
        <div className={styles.row}>
          <div className={styles.text_color + ' pr-6'} onClick={cancelClick}> Отменить </div>
          <Button htmlType="button" type="primary" size="medium" onClick={onClickUpdate}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}