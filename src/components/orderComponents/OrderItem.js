import React from "react";
import Avatar from "../common/UIElements/Avatar";

const OrderItem = ({ product }) => {
  return (
    <>
      <div className="product-modal_image_item">
        <Avatar
          className="image_radius"
          image={product.image}
          alt={product.title}
        />
      </div>
      <div className="product-modal_content_item">
        <p>{product.description}</p>
        <div className="product-modal_box">
          <div className="order_info">
            <p>seller: {}</p>
            <h3>Price: {product.price + "$"}</h3>
            <div className="product-modal_qun-orderItem">
              <div>Quantity:</div>
              <div>{product.quantity}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
