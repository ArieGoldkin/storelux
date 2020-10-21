import React from "react";
import CustomAvatar from "../common/UIElements/CustomAvatar";
import "./ordersCss/OrderItem.css";

const OrderItem = (props) => {
  const { product } = props;
  return (
    <>
      <div className={`item_wrapper ${props.className}`}>
        <div className="product-modal_image_item" style={props.imageItem}>
          <CustomAvatar
            style={props.style}
            className="image_avatar"
            image={product.image}
            alt={product.title}
          />
        </div>
        <div
          className="product-modal_content_item"
          style={props.contentItemStyle}
        >
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div className="product-info_box">
            <div className="order_info">
              <p>seller: {}</p>
              <h3>Price: {`$${product.price}`}</h3>
              <div className="product-modal_qun-orderItem">
                <div>Quantity:</div>
                <div>{product.quantity}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
