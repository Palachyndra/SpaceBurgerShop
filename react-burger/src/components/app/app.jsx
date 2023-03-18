import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import main from './app.module.css'
import { DataContext, DataOrder, DataSumOrder } from '../../utils/context.js'

const sumInitialState = { sum: 0 };

function App() {

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        var sum = 0;
        Object.keys(action.payload).forEach(key => {
          sum = sum + action.payload[key].price;
        });
        return { sum: sum };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const url = "https://norma.nomoreparties.space/api/ingredients";
  const [dataBurgers, setDataBurgers] = React.useState({});
  const [dataOrders, setDataOrders] = React.useState({});
  const [sumState, sumDispatcher] = React.useReducer(reducer, sumInitialState);

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
            bun.push(prop);
          }
          if (prop.type === "sauce") {
            souce.push(prop);
          }
          if (prop.type === "main") {
            main.push(prop);
          }
        });
        setDataBurgers({
          ...dataBurgers,
          data: { bun: bun, main: main, souce: souce },
          success: data.success,
        });
      })
      .catch(() => {
        setDataBurgers({
          ...dataBurgers,
          success: false,
        });
      });
  }, []);

  return (
    <>
      {dataBurgers.data && dataBurgers.success ? (
        <>
          <AppHeader />
          <main className={main.main}>
            <DataContext.Provider value={{ dataBurgers, setDataBurgers }} >
              <DataOrder.Provider value={{ dataOrders, setDataOrders, }} >
                <DataSumOrder.Provider value={{ sumState, sumDispatcher }} >
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DataSumOrder.Provider>
              </DataOrder.Provider>
            </DataContext.Provider>
          </main>
        </>
      ) : 'Loading...'}
    </>
  );
}

export default App;