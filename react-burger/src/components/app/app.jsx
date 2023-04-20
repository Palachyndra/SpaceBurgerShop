import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { INSTALL_DATA } from '../../services/actions/burger.js';
import main from './app.module.css'
import { urlApi } from '../../utils/context.js'
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const url = urlApi + "ingredients";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((data) => {
        const bun = [];
        const souce = [];
        const main = [];
        data.data.map((prop) => {
          if (prop.type === "bun") {
            prop.count = 0;
            bun.push(prop);
          }
          if (prop.type === "sauce") {
            prop.count = 0;
            souce.push(prop);
          }
          if (prop.type === "main") {
            prop.count = 0;
            main.push(prop);
          }
        });
        dispatch({
          type: INSTALL_DATA, payload: {
            data: { bun, main, souce },
            success: data.success,
          }
        })
      })
      .catch((res) => {
        return Promise.reject(`Ошибка ${res.status}`);
      });
  }, [])
  const dataBurgers = useSelector(store => store.cartReducer.items);

  return (
    <>
      {dataBurgers.data && dataBurgers.success ? (
        <>
          <AppHeader />
          <main className={main.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </>
      ) : 'Loading...'}
    </>
  );
}

export default App;