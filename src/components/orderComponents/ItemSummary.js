import React from "react";

const ItemSummary = (props) => {
  
  const calcPrice = props.quantity * props.price;
  const calcVat = calcPrice * props.vatRate;
  const calcTotalPrice = (calcPrice + calcVat).toFixed(2);

  return (
    <div className={props.className}>
      <h2 className="summary-header">Item Summary</h2>
      <div className="summary-subtotal">
        <div>Subtotal Price: </div>
        <div>{calcPrice + " $"}</div>
      </div>
      <div className="summary-vat">
        <div>VAT: </div>
        <div>{calcVat + " $"}</div>
      </div>
      <hr />
      <div className="summary-total__sum">
        <div>Total sum:</div>
        <div>{calcTotalPrice + " $"}</div>
      </div>
    </div>
  );
};

export default ItemSummary;
