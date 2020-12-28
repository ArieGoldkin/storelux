import React from "react";

import Modal from "../../../components/common/UIElements/Modal";
import CustomAvatar from "../../../components/common/UIElements/CustomAvatar";
import { Button } from "@material-ui/core";
import "../css/ProductsItemModal.css";

const ProductsItemModal = (props) => {
  return (
    <Modal
      show={props.showProduct}
      onCancel={props.close}
      header={props.title}
      ref={props.modalRef}
      headerClass="product-modal_header"
      contentClass="product-item__modal-content"
      footerClass="product-item__modal-actions"
      footer={
        <>
          <Button onClick={props.closeHandler}>CLOSE</Button>
          <Button onClick={props.addToCart}>ADD TO CART</Button>
        </>
      }
    >
      <div className="info-container">
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
              <button className="btn_qun" onClick={props.addQuantityHandler}>
                <div className="plus">+</div>
              </button>
              <div>{props.quantity}</div>
              <button className="btn_qun" onClick={props.removeQuantityHandler}>
                <div className="minus">-</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductsItemModal;
