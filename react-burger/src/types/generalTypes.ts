import { Location } from 'history';

export type TStoreProfile = {
    accessToken: string,
    authorization: boolean,
    authorizationEmail: string,
    authorizationName: string,
    authorizationPassword: string | undefined,
    refreshToken: string,
}

export type TStoreBurgerData = {
    _id: string,
    name: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    typeClass: string | undefined,
    type: string | undefined,
    count: number | undefined,
    uuid: number | undefined,
    isLocked : boolean | undefined
}

export type TLocation = {
    background: Location
    from?: string;
}

export type TOrder = {
    image_mobile: string,
    isLocked: boolean,
    name: string,
    price: number,
    typeClass: string,
    types: string,
    uuid: number,
    _id: string
}