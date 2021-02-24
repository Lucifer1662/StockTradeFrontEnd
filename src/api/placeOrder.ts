import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Order, OrderData } from "../interfaces/Order";
import { useOrdersContext } from "../state/orders";
import { useUserFundsContext } from '../state/UserFunds';
import { endpoint } from "./endpoint";



export async function placeOrder(accessToken:string, sub:string, order:OrderData){
    try {
        const uid = sub.replace(new RegExp(".*\\|"), "");          

        const metadataResponse = await fetch(endpoint+"/order?uid="+uid, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body : JSON.stringify(order),
        });

    } catch (e) {
        console.log(e)
    }
 
}

export function usePlaceOrder(){
    const ordersState = useOrdersContext();
    const useFundsContext = useUserFundsContext();
    const [orders, setOrders] = useState<OrderData[]>([]);
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const deleteOrders = async ()=>{ 
        if(isAuthenticated){
            const token = await getAccessTokenSilently();
            const orderCopy = [...orders];
            if(orders.length > 0)
                setOrders([]);
            const promises = orderCopy.map((order)=>placeOrder(token, user.sub, order))
            await Promise.all(promises);

            ordersState.refresh();
            useFundsContext.refresh();
        }
        
    }

    useEffect(()=>{
        deleteOrders();
    }, [user, isAuthenticated, orders]);

    const addPlaceOrder = (order:OrderData, )=>{ 
        setOrders([...orders, order]) 
    }

    return addPlaceOrder;
}
