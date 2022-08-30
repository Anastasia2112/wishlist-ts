
export type WishType = {
    id: string,
    name: string,
    link: string,
    price: number,
    img: string,
    category: string,
    desc: string,
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
    firestore: any
}

export type CheckContextType = {
    checkedWishes: string[],
    wishCount: number,
    updateCheck : (id: string) => void
}