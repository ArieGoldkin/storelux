export const calcSummary = (cart, vatRate) => {
  const totalSumPrices = cart
    .map((item) => item.price * item.quantity)
    .reduce((sumVal, currVal) => sumVal + currVal, 0);

  const calcVat = totalSumPrices * vatRate;
  const totalSum = totalSumPrices + calcVat;
  const calcVatPrice = calcVat.toFixed(2) * 1;

  return { totalSum, calcVatPrice, totalSumPrices };
};