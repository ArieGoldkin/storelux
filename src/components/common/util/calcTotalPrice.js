export const calcSummary = (cart, vatRate) => {
  let newSum = 0;
  let sum;
  let calcVat;
  let total;
  let totalPrice = cart.map((item) => item.price * item.quantity);
  totalPrice.map((item) => (newSum += item));
  calcVat = (newSum * vatRate).toFixed(2);
  total = newSum.toFixed(2);
  sum = (parseFloat(calcVat) + newSum).toFixed(2);
  return { sum, calcVat, total };
};

export const calcProductOrderSummary = (items, vatRate) => {
  let newSum = 0;
  let sum;
  let calcVat;
  let total;
  let totalPrice = items.map((item) => item.quantity * item.price);

  for (let i = 0; i < totalPrice.length; i++) {
    newSum += totalPrice[i];
  }
  calcVat = (newSum * vatRate).toFixed(2);
  total = newSum.toFixed(2);
  sum = (parseFloat(calcVat) + newSum).toFixed(2);
  return { sum, calcVat, total };
};
