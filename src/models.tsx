export interface WishType {
    id: string,
    name: string,
    link?: string,
    price: number,
    img?: string,
    category: string,
    desc?: string,
    userId: string,
    isGranted: boolean,
    created: number
}

export interface IHomepage {
    isArchive: boolean
}

export interface ICardList {
    wishesArr : WishType[],
    unicCategs : string[]
}

export interface ICardItem  { 
    wishItem : WishType,
    unicCategs : string[],
    key? : string,
}

export type FirebaseContextType = {
    auth : any
    user: any,
    signInWithGoogle : () => void,
    logout : () => void,
    createUser : (email: string, password: string) => void,
    signIn : (email: string, password: string) => void,
    authError: boolean,
    createNewWish : (newWish: WishType) => void,
    deleteWish : (id: string) => void,
    updateWish : (editWish: any, id: string) => void,
    updateIsGranted : (value: boolean, id: string) => void,
    defaultImg: string | undefined,
    deleteImgFromStorage : (imgName: string) => void,
    forgotPassword : (email: string) => void
}

export type CheckContextType = {
    checkedWishes: string[],
    wishCount: number,
    updateCheck : (id: string) => void,
    deleteCheck : (id: string) => void
}

export type AuthFormValues = {
    password: string, 
    remember: boolean, 
    email: string
}