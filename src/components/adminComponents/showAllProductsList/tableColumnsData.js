export const columnsData = [
  { id: "image", align: "left" },
  { id: "title", label: "Product Title", minWidth: 170, align: "left" },
  { id: "owner", label: "Owner", minWidth: 100, align: "left" },
  {
    id: "category",
    label: "Category",
    minWidth: 100,
    align: "left",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    align: "left",
  },
  {
    id: "units",
    label: "Units",
    minWidth: 65,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "available",
    label: "Available",
    minWidth: 65,
    align: "left",
  },
];
