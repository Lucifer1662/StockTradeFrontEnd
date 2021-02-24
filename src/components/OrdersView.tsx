import React, { useContext } from "react";
import { OrderCard } from "./OrderCard";
import _ from 'lodash';
import { useOrders } from "../api/getOrders";
import { OrderContext } from "../state/orders";

export default function OrdersVeiw(){
  const orderContext = useContext(OrderContext);
  return <div>
    <button onClick={()=>orderContext.refresh()} >Refresh</button>
    <div>
      {orderContext.orders.map(order => <OrderCard stock={order.stock} id={order.id} price={order.price} volume={order.volume} isBuy={order.isBuy}/> )}
    </div>

  </div>
};