
export type WishType = {
    id: string,
    name: string,
    link: string,
    price: number,
    img: string,
    category: string
}

export interface ICardItem  { 
    wishItem : WishType,
    func : (a: string) => void,
    key? : number
}

export interface IDropdownBtn {
    btnText: string,
    menuItems: string[]
}