import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { Order, OrderData } from "../interfaces/Order";
import { useOrdersContext } from "../state/orders";
import { useUserFundsContext } from '../state/UserFunds';
import { endpoint } from "./endpoint";



export async function addUserFunds(accessToken:string, sub:string, fund:number){
    try {
        const uid = sub.replace(new RegExp(".*\\|"), "");          

        await fetch(endpoint+"/addUserFunds?uid="+uid, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            method: "POST",
            body : JSON.stringify({money: fund}),
        });

    } catch (e) {
        console.log(e)
    }
 
}

export function useAddUserFunds(){
    const userFundsContext = useUserFundsContext();
    const [funds, setFunds] = useState<number[]>([]);
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const addFunds = async ()=>{ 
        if(isAuthenticated){
            const token = await getAccessTokenSilently();
            const fundsCopy = [...funds];
            if(fundsCopy.length > 0)
                setFunds([]);
            const promises = fundsCopy.map((fund)=>addUserFunds(token, user.sub, fund))
            await Promise.all(promises);

            userFundsContext.refresh();
        }
    }

    useEffect(()=>{
        addFunds();
    }, [user, isAuthenticated, funds]);

    const addFundsToQueue = (fund:number)=>{ 
        setFunds([...funds, fund]) 
    }

    return addFundsToQueue;
}
