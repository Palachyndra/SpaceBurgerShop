import { FC } from 'react';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import main from '../../src/components/app/app.module.css'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const HomePage: FC = () => {
  return (
    <main className={main.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
    </main> 
  );
}