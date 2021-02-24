import { useOrders } from '../api/getOrders';
import { placeOrder } from '../api/placeOrder';
import { Order } from '../interfaces/Order';
import {createContext} from 'react'
import { useContext } from 'react';


class Orders{
    constructor(public orders: Order[] = [],
        private refreshFunc? : ()=>void){}
    
    refresh(){
        if(this.refreshFunc)
            this.refreshFunc();
    }
}


export let OrderContext = createContext(new Orders());

export function OrderProvider(props:any){
    const [orders, refresh] = useOrders();
    
    return <OrderContext.Provider {...props} value={new Orders(orders, refresh)} />;
}

export function useOrdersContext(){
    return useContext(OrderContext);
}
