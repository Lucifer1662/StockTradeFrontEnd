import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useOrdersContext } from "../state/orders";
import { useUserFundsContext } from "../state/UserFunds";
import { endpoint } from "./endpoint";



export async function deleteOrder(accessToken:string, sub:string, orderid:number){
    try {
        const uid = sub.replace(new RegExp(".*\\|"), "");          

        await fetch(endpoint+"/order?uid="+uid+"&orderid="+orderid, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: "DELETE",
        });
    } catch (e) {
        console.log(e)
    }
 
}

export function useDeleteOrder(){
    const ordersState = useOrdersContext();
    const useFundsContext = useUserFundsContext();

    const [orderIds, setOrders] = useState<number[]>([]);
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const deleteOrders = async ()=>{ 
        if(isAuthenticated){
            const token = await getAccessTokenSilently();
            const orderCopy = [...orderIds];
            if(orderIds.length > 0)
                setOrders([]);
            const promises = orderCopy.map((orderId)=>deleteOrder(token, user.sub, orderId))
            await Promise.all(promises);
           
            ordersState.refresh();
            useFundsContext.refresh();
        }
        
    }

    useEffect(()=>{
        deleteOrders();
    }, [user, isAuthenticated, orderIds]);

    const addDeleteOrder = (orderId:number)=>{ 
        setOrders([...orderIds, orderId]) }

    return addDeleteOrder;

}