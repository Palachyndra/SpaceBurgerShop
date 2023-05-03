import { DELETE_ITEM, ADD_ORDER_NUMBER, INCREASE_ITEM_BUNS, INCREASE_ITEM_INGREDIENTS, INCREASE_PRODUCT_ITEM, INSTALL_DATA, CHANGE_INGREDIENTS_ITEM, CHANGE_BUNS_ITEM, SWITCH_ING_ITEM, INCREASE_SUM_ORDER, INCREASE_ORDER, DECREASE_SUM_ORDER } from '../actions/burger';
import { items, ingredientsNow, productNow, orderNumber, sumOrders } from '../initialData';

const initialState = {
    items,
    ingredientsNow,
    productNow,
    orderNumber,
    typeClass: ["default", "bun", "sauce", "main"],
    sumOrders
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
                } else {
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
            
            if (state.items.data.bun.length) {
                state.items.data.bun.forEach(item => {
                    item.count = 0;
                });
                state.items.data.bun.filter((item) => item._id === action.payload.bun[0]._id)
                    .map(item => item.count = 2
                )
            }

            return {
                ...state,
                ingredientsNow: { bun: action.payload.bun, ingredients: state.ingredientsNow.ingredients }
            };
        }
        case CHANGE_INGREDIENTS_ITEM: {

            if (data.typeClass === 'sauce' && state.items.data.souce.length !== 0) {
                state.items.data.souce.filter((item) =>
                    item._id === data._id && item.count++);
            }

            if (data.typeClass === 'main' && state.items.data.main.length !== 0) {
                state.items.data.main.filter((item) =>
                    item._id === data._id && item.count++);
            }

            return {
                ...state,
                items: state.items,
                ingredientsNow: {
                    bun: state.ingredientsNow.bun,
                    ingredients: Array.from(state.ingredientsNow.ingredients).concat(action.payload)
                }
            };
        }
        case SWITCH_ING_ITEM: {
            const toIndex = action.payload.hoverIndex;
            const fromIndex = action.payload.dragIndex;
            const ingredients = [...state.ingredientsNow.ingredients];

            ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0])

            return {
                ...state,
                ingredientsNow: { bun: state.ingredientsNow.bun, ingredients }
            };
        }
        case INCREASE_ORDER: {
            let sum = 0;
            Object.keys(action.payload.bun).forEach(key => {
                sum = sum + action.payload.bun[key].price;
            });

            if (Object.keys(state.ingredientsNow.ingredients).length)
                Object.keys(state.ingredientsNow.ingredients).forEach(key => {
                    sum = sum + state.ingredientsNow.ingredients[key].price;
                });
            return {
                ...state,
                sumOrders: sum
            };
        }
        case INCREASE_SUM_ORDER: {
            const sum = state.sumOrders + action.payload.price;
            return {
                ...state,
                sumOrders: sum
            };
        }
        case DECREASE_SUM_ORDER: {
            const sum = state.sumOrders - action.payload.price;
            return {
                ...state,
                sumOrders: sum
            };
        }
        default: {
            return state;
        }
    }
};
