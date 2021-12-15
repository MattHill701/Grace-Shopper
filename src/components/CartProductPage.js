import { getUser } from "../auth";
import React, { useState, useEffect } from "react";
import { finishCart, getOrderById, getAllOrders } from "../api";
import { useHistory, Link } from "react-router-dom";

const CartProductPage = () => {
  const [order, setOrder] = useState([]);
  let user = getUser();
  console.log("this is user", user);
  let history = useHistory();

  async function fetchOrderById() {
    const pinnedOrder = await getOrderById(user.userId);
    console.log("this is pinned order", pinnedOrder);
    let order1 = await finishCart(pinnedOrder);
    console.log("this is order1.products", order1.products);
    setOrder(order1.products);
    console.log("this is orders", order);
  }

  useEffect(() => {
    fetchOrderById();
  }, []);
  console.log("this is the order going in", order);

  return (
    <div>
      <h1>shopping cart</h1>
      <div className="cart_items">
        {order.map((item) => {
          console.log("this is item", item);
          return (
            <div className="cart_product" key={`${item.id}`}>
              <h4>{item.name}</h4>
              <h6>${item.price}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
  // if(order){
  //   order.map((item)=>{
  //     console.log("this is item", item)
  //     return(
  //       <div className="cart_product" key={`${item.id}`}>
  //          <h2>{item.name}</h2>
  //          <h3>{item.price}</h3>
  //       </div>
  //     )
  //   })
  // } else{
  //   return (<div> this is cart</div>)
  // }
};

export default CartProductPage;
