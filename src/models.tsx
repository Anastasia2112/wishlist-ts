
export type WishType = {
    id: string,
    name: string,
    link?: string,
    price: number,
    img: string,
    category: string,
    desc?: string,
    userId: string
}

export interface ICardList {
    wishesArr : WishType[]
}

export interface ICardItem  { 
    wishItem : WishType,
    func : (a: string) => void,
    key? : number,
}

export type FirebaseContextType = {
    auth : any
    firestore: any,
    user: any,
    signInWithGoogle : () => void,
    logout : () => void,
    createUser : (email: string, password: string) => void,
    signIn : (email: string, password: string) => void
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