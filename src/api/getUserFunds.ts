import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { endpoint } from "./endpoint";


export interface UserFunds{
    unsettledFunds?: number;
    buyingPower?: number
}


export async function getUserFunds(accessToken:string, sub:string){
    try {
        const uid = sub.replace(new RegExp(".*\\|"), "");          

        const metadataResponse = await fetch(endpoint+"/userFunds?uid="+uid, {
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

export function useUserFunds() : [UserFunds, ()=>void]{
    const [useFunds, setUserData] = useState<UserFunds>({unsettledFunds:undefined, buyingPower:undefined});
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const loadUserFunds = async ()=>{ 
        if(isAuthenticated){
            const token = await getAccessTokenSilently();
            const newUserFunds = await getUserFunds(token, user.sub);
            if(newUserFunds !== undefined)
                setUserData(newUserFunds);
            else
                setUserData({unsettledFunds:undefined, buyingPower:undefined})
        }
    }

    useEffect(()=>{
        loadUserFunds();
    }, [user, isAuthenticated]);

    return [useFunds, loadUserFunds];

}