import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core"
import { useUserFundsContext } from '../state/UserFunds';
import { useAddUserFunds } from "../api/addUserFunds";


export function UserFunds() {
    const {userFunds} = useUserFundsContext();
    const addFunds = useAddUserFunds();
    console.log(userFunds)
    return <Card>
        <CardContent>
            <Typography> Buying Power: ${userFunds.buyingPower}</Typography>
            <Typography> Unsettled Funds: ${userFunds.unsettledFunds}</Typography>
            <Button onClick={()=>addFunds(100)}>Deposit Money</Button>
        </CardContent>
    </Card>
};