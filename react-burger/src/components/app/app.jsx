import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import main from './app.module.css'
import { DataSumOrder } from '../../utils/context.js'
import { useSelector, useDispatch } from 'react-redux';

const sumInitialState = { sum: 0 };
const url = "https://norma.nomoreparties.space/api/ingredients";

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
          type: "INSTALL_DATA", payload: {
            data: { bun, main, souce },
            success: data.success,
          }
        })
      })
  }, [])
  const dataBurgers = useSelector(store => store.cartReducer.items);
  const [sumState, sumDispatcher] = React.useReducer(reducer, sumInitialState);

  function reducer(state, action) {
    switch (action.type) {
      case "increment": {
        var sum = 0;
        Object.keys(action.payload).forEach(key => {
          sum = sum + action.payload[key].price;
        });
        return { sum: sum };
      }
      case "decrease": {
        sum = state.sum - action.payload.price;
        return { sum: sum };
      }
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }


  return (
    <>
      {dataBurgers.data && dataBurgers.success ? (
        <>
          <AppHeader />
          <main className={main.main}>
            <DataSumOrder.Provider value={{ sumState, sumDispatcher }} >
              <BurgerIngredients dataBurgers={dataBurgers} />
              <BurgerConstructor />
            </DataSumOrder.Provider>
          </main>
        </>
      ) : 'Loading...'}
    </>
  );
}

export default App;