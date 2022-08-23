
export type WishType = {
    id: string,
    name: string,
    link: string,
    price: number,
    img: string
}

export interface ICardItem  { 
    wishType : WishType,
    func : (a: string) => void,
    key? : number
}

export interface IDropdownBtn {
    btnText: string
}