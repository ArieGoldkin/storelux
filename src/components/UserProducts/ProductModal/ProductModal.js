import React from "react";

import CustomAvatar from "../../common/UIElements/CustomAvatar";
import "../css/ProductModal.css";

const ProductModal = (props) => {
  const { quantity, setQuantity } = props;
  console.log(props);

  const addQuantityHandler = () => {
    if (quantity !== props.units) {
      setQuantity(quantity + 1);
    }
  };

  const removeQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <div className="product-modal_image">
        <CustomAvatar
          className="image_radius"
          image={props.image}
          alt={props.title}
        />
      </div>
      <div className="product-modal_content">
        <p>{props.description}</p>
        <div className="product-modal_box">
          <div>
            <h3>Price: {props.price + "$"}</h3>
            <p>Units Available: {props.units}</p>
          </div>
          <div className="product-modal_qun">
            <button className="btn_qun" onClick={addQuantityHandler}>
              <div className="plus">+</div>
            </button>
            <div>{quantity}</div>
            <button className="btn_qun" onClick={removeQuantityHandler}>
              <div className="minus">-</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
