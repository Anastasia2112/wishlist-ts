
export type WishType = {
    id: string,
    name: string,
    link: string,
    price: number,
    img: string,
    category: string
}

export interface ICardList {
    wishesArr : WishType[]
}

export interface ICardItem  { 
    wishItem : WishType,
    func : (a: string) => void,
    key? : number,
    addCheck : (newCheck: any) => any,
}