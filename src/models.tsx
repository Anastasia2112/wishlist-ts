export interface WishType {
    id: string,
    name: string,
    link?: string,
    price: number,
    img?: string,
    category: string,
    desc?: string,
    userId: string,
    isCompleted: boolean
}

export interface ICardList {
    wishesArr : WishType[],
    unicCategs : string[]
}

export interface ICardItem  { 
    wishItem : WishType,
    unicCategs : string[],
    key? : number,
}

export type FirebaseContextType = {
    auth : any
    firestore: any,
    user: any,
    signInWithGoogle : () => void,
    logout : () => void,
    createUser : (email: string, password: string) => void,
    signIn : (email: string, password: string) => void,
    authError: boolean,
    deleteWish : (id: string) => void,
    updateWish : (editWish: WishType, id: string) => void,
    defaultImg: string | undefined,
    deleteImgFromStorage : (imgName: string) => void
}

export type CheckContextType = {
    checkedWishes: string[],
    wishCount: number,
    updateCheck : (id: string) => void
}

export type AuthFormValues = {
    password: string, 
    remember: boolean, 
    email: string
}