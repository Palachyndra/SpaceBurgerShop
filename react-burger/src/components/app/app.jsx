import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import main from './app.module.css'

function App() {
  const url = "https://norma.nomoreparties.space/api/ingredients";
  const [dataBurgers, setDataBurgers] = React.useState({});
  
  React.useEffect(() => {
    setDataBurgers({ ...dataBurgers });
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
            <BurgerIngredients burgerIngredients={dataBurgers.data} />
            <BurgerConstructor dataOrders={dataBurgers.data} />
          </main>
        </>
      ) : 'Loading...'}
    </>
  );
}

export default App;