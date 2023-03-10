import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import main from './app.module.css'

  function App() {
    return (
      <>
        <AppHeader />
        <main className={main.main}>
              <BurgerIngredients />
              <BurgerConstructor />
        </main>
      </>
    );
  }
  
  export default App;