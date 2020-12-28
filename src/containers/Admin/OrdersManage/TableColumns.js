export const columnsTable = [
  { id: "orderId", label: "Order ID", minWidth: 100, align: "left" },
  { id: "userName", label: "User Name", minWidth: 110, align: "left" },
  { id: "email", label: "Email", minWidth: 100, align: "left" },
  { id: "address", label: "Shipping address", minWidth: 153, align: "left" },
  { id: "phone", label: "Contact phone", minWidth: 100, align: "left" },
  { id: "date", label: "Order date", minWidth: 100, align: "left" },
  {
    id: "sum",
    label: "Total price",
    minWidth: 100,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];
