import React, { useContext } from "react";
import {Card, CardHeader, CardContent, Typography, IconButton} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import { useDeleteOrder } from "../api/deleteOrder";
import { OrderContext } from "../state/orders";

interface OrderProps {
    id: number,
    isBuy: boolean,
    price: number,
    volume: number,
    stock: string
}


interface OrderDeleteButtonProps{
    orderId:number
}

function OrderDeleteButton({orderId} : OrderDeleteButtonProps){
    const deleteOrder = useDeleteOrder();
    
    return <IconButton onClick={()=>{
        deleteOrder(orderId);
    }} > <DeleteIcon/></IconButton>
}

export function OrderCard({ id, isBuy, price, volume, stock }: OrderProps) {

    const title = (isBuy?"Buy":"Sell") + " " + stock;
    return <Card>
       
        <CardContent>
        <CardHeader title={title}  action={<OrderDeleteButton orderId={id}/>} />
            <Typography>${price} x {volume}</Typography>
        </CardContent>
    </Card>
};