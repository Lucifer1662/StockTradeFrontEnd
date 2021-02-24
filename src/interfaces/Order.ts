

export interface OrderData {
    isBuy: boolean,
    price: number,
    volume: number,
    stock: string,
    uid: string
}


export interface Order extends OrderData {
    id: number,
}

