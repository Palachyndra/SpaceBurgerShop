import { TStoreBurgerData } from "../types/generalTypes";

export const urlApi = "https://norma.nomoreparties.space/api/";
export const wsApi = "wss://norma.nomoreparties.space/orders";
export const email = 'pozhidaevmasgmk@yandex.ru';
export const password = 'admin123';



export const dataFilter = (burger: any, element: any) => {
    return burger.bun.filter((item: TStoreBurgerData) => item._id === element)[0] ?
        burger.bun.filter((item: TStoreBurgerData) => item._id === element)[0] :
        burger.souce.filter((item: TStoreBurgerData) => item._id === element)[0] ?
            burger.souce.filter((item: TStoreBurgerData) => item._id === element)[0] :
            burger.main.filter((item: TStoreBurgerData) => item._id === element)[0] ?
                burger.main.filter((item: TStoreBurgerData) => item._id === element)[0] :
                "";
} 