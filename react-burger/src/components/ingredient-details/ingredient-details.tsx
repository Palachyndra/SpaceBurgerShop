import styles from './ingredient-details.module.css';
import { useSelector } from '../../types/hooks';
import { useLocation } from "react-router-dom";
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import { TStoreBurgerData } from '../../types/generalTypes'


const IngredientDetails = () => {
    const location = useLocation();
    const currentId = location.pathname.split('/ingredients/')[1];
    
    const ingredients = useSelector(store => store.cartReducer.items.data);

    const data = ingredients.bun.filter((item: TStoreBurgerData) => item._id === currentId)[0] ?
        ingredients.bun.filter((item: TStoreBurgerData) => item._id === currentId)[0] :
        ingredients.souce.filter((item: TStoreBurgerData) => item._id === currentId)[0] ?
            ingredients.souce.filter((item: TStoreBurgerData) => item._id === currentId)[0] :
            ingredients.main.filter((item: TStoreBurgerData) => item._id === currentId)[0] ?
                ingredients.main.filter((item: TStoreBurgerData) => item._id === currentId)[0] :
                "";
    return (
        <div className={styles.main}>
            <div className={styles.photo}> <img src={data.image_large} alt={data.name} /> </div>
            <div className={"text text_type_main-medium pt-4 pb-8 " + styles.text}> {data.name} </div>
            <div className={styles.burgers_container + " pb-15"}>
                <div className={styles.burgers_container_elements + " text text_type_main-default text_color_inactive"}>
                    <div> Калории,ккал </div>
                    <div className={"text text_type_digits-default"}> {data.calories} </div>
                </div>
                <div className={styles.burgers_container_elements + " text text_type_main-default text_color_inactive"}>
                    <div> Белки, г </div>
                    <div className={"text text_type_digits-default"}> {data.proteins} </div>
                </div>
                <div className={styles.burgers_container_elements + " text text_type_main-default text_color_inactive"}>
                    <div> Жиры, г </div>
                    <div className={"text text_type_digits-default"}> {data.fat} </div>
                </div>
                <div className={styles.burgers_container_elements + " text text_type_main-default text_color_inactive"}>
                    <div> Углеводы, г </div>
                    <div className={"text text_type_digits-default"}> {data.carbohydrates} </div>
                </div>
            </div>
        </div>
    )
}


export default IngredientDetails;