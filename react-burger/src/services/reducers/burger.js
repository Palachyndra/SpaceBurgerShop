import { DELETE_ITEM, ADD_ORDER_NUMBER, INCREASE_ITEM, INCREASE_PRODUCT_ITEM, INSTALL_DATA, CHANGE_ITEM } from '../actions/burger';
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
        case INCREASE_ITEM: {
            return {
                ...state,
                ingredientsNow: { data }
            };
        }
        case DELETE_ITEM: {
            let data = [];
            let deleteItem = [];
            Object.keys(state.ingredientsNow.data).forEach(key => {
                if (state.ingredientsNow.data[key].uuid !== action.payload.uuid) {
                    data.push(state.ingredientsNow.data[key]);
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
                ingredientsNow: { data }
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
        case CHANGE_ITEM: {
            let data = [];
            Object.keys(state.ingredientsNow.data).forEach(key => {
                Object.keys(action.payload).forEach(key2 => {
                    if (state.ingredientsNow.data[key]._id !== action.payload[key2]._id &&
                        state.ingredientsNow.data[key].type !== action.payload[key2].type) {
                        data.push(action.payload[key2]);
                    }
                })
            })
            return {
                ...state,
                ingredientsNow: { data }
            };
        }
        default: {
            return state;
        }
    }
};
