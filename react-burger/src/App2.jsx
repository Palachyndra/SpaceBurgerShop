import React from 'react';
import AppHeader from './components/app-header/app-header'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import './style.css'

  function App() {
    return (
      <>
        <AppHeader></AppHeader>
        <main className="main">
              <BurgerIngredients></BurgerIngredients>
              <BurgerConstructor></BurgerConstructor>
        </main>
      </>
    );
  }
  
  export default App;