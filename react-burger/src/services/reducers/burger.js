import { DELETE_ITEM, ADD_ORDER_NUMBER, INCREASE_ITEM_BUNS, INCREASE_ITEM_INGREDIENTS, INCREASE_PRODUCT_ITEM, INSTALL_DATA, CHANGE_INGREDIENTS_ITEM, CHANGE_BUNS_ITEM, SWITCH_ING_ITEM } from '../actions/burger';
import { items, ingredientsNow, productNow, orderNumber } from '../initialData';

const initialState = {
    items,
    ingredientsNow,
    productNow,
    orderNumber,
    typeClass: ["default", "bun", "sauce", "main"]
};

export const cartReducer = (state = initialState, action) => {
    const data = action.payload;
    switch (action.type) {
        case INSTALL_DATA: {
            return {
                ...state,
                items: data
            };
        }
        case INCREASE_ITEM_BUNS: {
            return {
                ...state,
                ingredientsNow: { ...state.ingredientsNow, bun: { ...action.payload.bun } }
            };
        }
        case INCREASE_ITEM_INGREDIENTS: {
            return {
                ...state,
                ingredientsNow: {
                    bun: { ...state.ingredientsNow.bun },
                    ingredients: Array.from(state.ingredientsNow.ingredients).concat(action.payload)
                }
            };
        }
        case DELETE_ITEM: {
            let ingredients = [];
            let deleteItem = [];

            Object.keys(state.ingredientsNow.ingredients).forEach(key => {
                if (state.ingredientsNow.ingredients[key].uuid !== action.payload.uuid) {
                    ingredients.push(state.ingredientsNow.ingredients[key]);
                    deleteItem = action.payload._id;
                }
            })

            Object.keys(state.items.data.souce).forEach(key => {
                if (state.items.data.souce[key]._id === deleteItem) {
                    state.items.data.souce[key].count--;
                }
            })

            Object.keys(state.items.data.main).forEach(key => {
                if (state.items.data.main[key]._id === deleteItem) {
                    state.items.data.main[key].count--;
                }
            })

            return {
                ...state,
                ingredientsNow: { bun: state.ingredientsNow.bun, ingredients: ingredients }
            };
        }
        case INCREASE_PRODUCT_ITEM: {
            return {
                ...state,
                productNow: { ...state.productNow, data }
            };
        }
        case ADD_ORDER_NUMBER: {
            return {
                ...state,
                orderNumber: data
            };
        }
        case CHANGE_BUNS_ITEM: {
            return {
                ...state,
                ingredientsNow: { bun: action.payload.bun, ingredients: state.ingredientsNow.ingredients }
            };
        }
        case CHANGE_INGREDIENTS_ITEM: {
            return {
                ...state,
                ingredientsNow: {
                    bun: state.ingredientsNow.bun,
                    ingredients: Array.from(state.ingredientsNow.ingredients).concat(action.payload)
                }
            };
        }
        case SWITCH_ING_ITEM: {
            console.log(action.payload)
            // return {
            //     ...state,
            //     ingredientsNow: { bun: state.ingredientsNow.bun, ingredients: action.payload }
            // };
        }
        default: {
            return state;
        }
    }
};
