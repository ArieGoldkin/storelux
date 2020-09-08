import React from "react";

import AllProductsItem from "./AllProductsItem";
import "./productsCss/AllProductsList.css";

const AllProductsList = ({ products, users, searchValue }) => {
  const filteredProducts = products.filter((entity) =>
    entity.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>Product Name</th>
          <th>Owner</th>
          <th>Category</th>
          <th>Price</th>
          <th>Units</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => {
          return (
            <AllProductsItem
              key={product.id}
              id={product.id}
              image={`http://localhost:5000/${product.image}`}
              title={product.title}
              creatorId={users.map((user) =>
                user.id === product.creator
                  ? user.firstName + " " + user.lastName
                  : null
              )}
              category={product.category}
              price={product.price}
              units={product.units}
              description={product.description}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default AllProductsList;
