import {createContext} from 'react'
import { UserFunds, useUserFunds } from '../api/getUserFunds';
import { useContext } from 'react';


class UserFundsState{
    constructor(
        public userFunds: UserFunds = { unsettledFunds :undefined, buyingPower:undefined},
        private refreshFunc?: ()=>void,  
    ){}

    refresh(){
        if(this.refreshFunc)
            this.refreshFunc();
    }
}


export let UserFundsContext = createContext(new UserFundsState());

export function UserFundsProvider(props:any){
    const [userFunds, refresh] = useUserFunds();
    console.log(userFunds)
    
    return <UserFundsContext.Provider {...props} value={new UserFundsState(userFunds, refresh)} />;
}


export function useUserFundsContext(){
    return useContext(UserFundsContext);
}