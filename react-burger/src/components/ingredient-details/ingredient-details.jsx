import styles from './ingredient-details.module.css';
import { ingredientType } from '../../utils/types.js'
import { useSelector } from 'react-redux';
import { } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientDetails = () => {
    const data = useSelector(store => store.cartReducer.productNow.data);
    return (
        <div>
            <div className={styles.photo}> <img src={data.image_large} alt={data.name} /> </div>
            <div className={"text text_type_main-medium pt-4 pb-8"}> {data.name} </div>
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

IngredientDetails.propTypes = { data: ingredientType };

export default IngredientDetails;