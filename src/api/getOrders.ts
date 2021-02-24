import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Order } from "../interfaces/Order";
import { endpoint } from "./endpoint";



export async function getOrders(accessToken:string, sub:string){
    try {
        const uid = sub.replace(new RegExp(".*\\|"), "");          

        const metadataResponse = await fetch(endpoint+"/orders?uid="+uid, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                
                
            },
            method: "GET",
        });

        return await metadataResponse.json()
    } catch (e) {
        console.log(e)
    }
 
    return []
}

export function useOrders() : [Order[], ()=>void]{
    const [orders, setOrders] = useState<Order[]>([]);
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const loadOrders = async ()=>{ 
        if(isAuthenticated){
            const token = await getAccessTokenSilently();
            const loadedOrders = await getOrders(token, user.sub);
            if(!_.isEqual(loadedOrders, orders))
                setOrders(loadedOrders)
        }
    }

    useEffect(()=>{
        loadOrders();
    }, [user, isAuthenticated]);

    return [orders, loadOrders];

}