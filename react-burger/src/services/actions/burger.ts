import {
    INCREASE_ITEM_BUNS, INCREASE_ITEM_INGREDIENTS, ADD_ORDER_NUMBER,
    DELETE_ITEM, INCREASE_PRODUCT_ITEM, INSTALL_DATA, CHANGE_BUNS_ITEM, CHANGE_INGREDIENTS_ITEM,
    SWITCH_ING_ITEM, INCREASE_SUM_ORDER, INCREASE_ORDER, DECREASE_SUM_ORDER
} from '../../constants/burger';
import { TStoreBurgerData } from '../../types/generalTypes';

export interface IIncreaseItemBuns {
    readonly type: typeof INCREASE_ITEM_BUNS;
    readonly payload: TIncreaseItemBuns;
}

type TIncreaseItemBuns = {
    bun: TStoreBurgerData
}

export interface IIncreaseItemIngredients {
    readonly type: typeof INCREASE_ITEM_INGREDIENTS;
    readonly payload: TIncreaseItemIngredients;
}

type TIncreaseItemIngredients = {
    ingredientsNow: {
        ingredients: any
    }
}

export interface IAddOrderNumber {
    readonly type: typeof ADD_ORDER_NUMBER;
    readonly payload: TAddOrderNumber;
}

type TAddOrderNumber = {
    orderNumber: number,
}

export interface IDeleteItem {
    readonly type: typeof DELETE_ITEM;
    readonly payload: TDeleteItem;
}

type TDeleteItem = {
    bun: TStoreBurgerData,
    ingredients: TStoreBurgerData
    uuid: number
    _id: number
}

export interface IIncreaseProductItem {
    readonly type: typeof INCREASE_PRODUCT_ITEM;
    readonly payload: any;
}

type TIncreaseProductItem = {
    productNow: TStoreBurgerData
}

export interface IInstallData {
    readonly type: typeof INSTALL_DATA;
    readonly payload: TInstallData;
}

type TInstallData = {
    bun: TStoreBurgerData,
    souce: TStoreBurgerData,
    main: TStoreBurgerData,
}


export interface IChangeBunsItem {
    readonly type: typeof CHANGE_BUNS_ITEM;
    readonly payload: any;
}

export interface IChangeIngredientsItem {
    readonly type: typeof CHANGE_INGREDIENTS_ITEM;
    readonly payload: TChangeIngredientsItem;
}

type TChangeIngredientsItem = {
    typeClass: string,
    _id: number,
}

export interface ISwitchIngItem {
    readonly type: typeof SWITCH_ING_ITEM;
    readonly payload: TSwitchIngItem;
}

type TSwitchIngItem = {
    hoverIndex: number,
    dragIndex: number,
}

export interface IIngredientsSumOrder {
    readonly type: typeof INCREASE_SUM_ORDER;
    readonly payload: TIngredientsSumOrder;
}

type TIngredientsSumOrder = {
    price: number,
}

export interface IDecreaseSumOrder {
    readonly type: typeof DECREASE_SUM_ORDER;
    readonly payload: TDecreaseSumOrder;
}

type TDecreaseSumOrder = {
    price: number,
}

export interface IIncreaseOrder {
    readonly type: typeof INCREASE_ORDER;
    readonly payload: any;
}

export type TItems =
    | IIncreaseItemBuns
    | IIncreaseItemIngredients
    | IAddOrderNumber
    | IDeleteItem
    | IIncreaseProductItem
    | IInstallData
    | IChangeBunsItem
    | IChangeIngredientsItem
    | ISwitchIngItem
    | IIngredientsSumOrder
    | IDecreaseSumOrder
    | IIncreaseOrder;
