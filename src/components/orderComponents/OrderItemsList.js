import React from "react";

import Card from "../common/UIElements/Card";
import ItemSummary from "./ItemSummary";
import OrderItem from "./OrderItem";
import "./ordersCss/OrderItemsList.css";

const OrderItemsList = ({ items, currentVat }) => {
  const imageStyle = {
    width: "12rem",
    height: "11rem",
  };

  const imageItem = {
    width: "15rem",
    height: "13rem",
  };

  const contentItem = {
    paddingBottom: "1rem",
  };

  return (
    <div>
      {items.map((product) => {
        return (
          <Card key={product.id} className="one_item_card">
            <OrderItem
              product={product}
              className="order_one_item"
              style={imageStyle}
              imageItem={imageItem}
              contentItemStyle={contentItem}
            />
            <ItemSummary
              className="order_summary"
              vatRate={currentVat}
              quantity={product.quantity}
              price={product.price}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default OrderItemsList;
