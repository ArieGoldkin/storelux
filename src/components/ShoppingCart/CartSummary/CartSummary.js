import React from "react";

import Card from "../../../components/common/UIElements/Card";
import Button from "../../../components/common/FormElements/Button";
import "./CartSummary.css";

const CartSummary = (props) => {
  let inOrderPage = props.orderPage;

  return (
    <Card className="shopping-cart__sum">
      <h2 className="summary-header">Order Summary</h2>
      <div className="summary-subtotal">
        <div>Subtotal Price: </div>
        <div>{`$${props.totalPrice}`}</div>
      </div>
      <div className="summary-vat">
        <div>VAT: </div>
        <div>{`$${props.vat}`}</div>
      </div>
      <hr />
      <div className="summary-total__sum">
        <div>Total sum:</div>
        <div>{`$${props.summary}`}</div>
      </div>
      {!inOrderPage && (
        <div className="order-btn">
          <Button
            to={`/${props.userId}/shoppingCart/summary`}
            buttonClass="order-now"
          >
            Buy Now
          </Button>
        </div>
      )}
    </Card>
  );
};
export default CartSummary;
