import { cartReducer } from './burger'
import { ADD_ORDER_NUMBER, INCREASE_PRODUCT_ITEM, INSTALL_DATA, CHANGE_INGREDIENTS_ITEM, CHANGE_BUNS_ITEM, SWITCH_ING_ITEM, INCREASE_SUM_ORDER, DECREASE_SUM_ORDER } from '../../constants/burger';
import { items, ingredientsNow, productNow, orderNumber, sumOrders } from '../initialData';

const initialState = {
    items,
    ingredientsNow,
    productNow,
    orderNumber,
    typeClass: ["default", "bun", "sauce", "main"],
    sumOrders
};

test('should return the initialState', () => {
    expect(cartReducer(undefined, { type: undefined })).toEqual(initialState)
})

test('INSTALL_DATA', () => {
    const bun = [{
        type: "bun",
        _id: "1"
    },
    {
        type: "bun",
        _id: "10"
    }
    ];
    const main = [{
        type: "main",
        _id: "2"
    }];
    const souce = [{
        type: "sauce",
        _id: "3"
    }];
    const payload = {
        data: { bun, main, souce },
        success: true,
    }
    expect(cartReducer(initialState, { type: INSTALL_DATA, payload })).toEqual({ ...initialState, items: payload })
})

test('INCREASE_PRODUCT_ITEM', () => {
    const actionType = {
        calories: 420,
        carbohydrates: 53,
        count: 0,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        __v: 0,
        _id: "643d69a5c3f7b9001cfa093c",
    };
    expect(cartReducer(initialState, { type: INCREASE_PRODUCT_ITEM, payload: actionType })).toEqual({ ...initialState, productNow: { ...initialState.productNow, actionType } })
})

test('ADD_ORDER_NUMBER', () => {
    const payload = {
        name: 'Test',
        order: {
            createdAt: "2023-06-24T07:09:16.491Z",
            name: "Антарианский традиционный-галактический бургер",
            number: 9794
        },
        success: true,
    };
    expect(cartReducer(initialState, { type: ADD_ORDER_NUMBER, payload })).toEqual({ ...initialState, orderNumber: payload })
})

test('CHANGE_BUNS_ITEM', () => {
    const payload = {
        bun: [{
            type: "bun",
            name: "Флюоресцентная булка R2-D3 (верх)",
            _id: "1"
        },
        {
            type: "bun",
            name: "Флюоресцентная булка R2-D3 (низ)",
            _id: "2"
        }]
    };
    initialState.items.data = {
        bun: [{
            type: "bun",
            _id: "1"
        },
        {
            type: "bun",
            _id: "10"
        }
        ],
        main: [{
            type: "main",
            _id: "2"
        }],
        souce: [{
            type: "sauce",
            _id: "3"
        }]
    };
    expect(cartReducer(initialState, { type: CHANGE_BUNS_ITEM, payload })).toEqual({ ...initialState, ingredientsNow: { bun: payload.bun, ingredients: initialState.ingredientsNow.ingredients } })
})


test('CHANGE_INGREDIENTS_ITEM', () => {
    const payload = {
        name: 'Test',
        uuid: "1",
        _id: "12",
        typeClass: "sauce"
    };
    expect(cartReducer(initialState, { type: CHANGE_INGREDIENTS_ITEM, payload })).toEqual({
        ...initialState,
        ingredientsNow: {
            bun: initialState.ingredientsNow.bun,
            ingredients: Array.from(initialState.ingredientsNow.ingredients).concat(payload)
        }
    })
})

test('SWITCH_ING_ITEM', () => {
    const hoverIndex = '0';
    const dragIndex = '1';
    const payload = {
        hoverIndex: hoverIndex,
        dragIndex: dragIndex
    };
    initialState.ingredientsNow.ingredients = [{
        bun: [{
            type: "bun",
            name: "Флюоресцентная булка R2-D3 (верх)",
            _id: "1"
        },
        {
            type: "bun",
            name: "Флюоресцентная булка R2-D3 (низ)",
            _id: "2"
        }]
    }];
    const ingredients = [...initialState.ingredientsNow.ingredients];
    ingredients.splice(hoverIndex, 0, ingredients.splice(dragIndex, 1)[0])

    expect(cartReducer(initialState, { type: SWITCH_ING_ITEM, payload })).toEqual({
        ...initialState,
        ingredientsNow: { bun: initialState.ingredientsNow.bun, ingredients }
    })
})

test('INCREASE_SUM_ORDER', () => {
    const payload = { price: 0 };
    expect(cartReducer(initialState, { type: INCREASE_SUM_ORDER, payload })).toEqual({ ...initialState })
})

test('DECREASE_SUM_ORDER', () => {
    const payload = { price: 0 };
    expect(cartReducer(initialState, { type: DECREASE_SUM_ORDER, payload })).toEqual({ ...initialState })
})
