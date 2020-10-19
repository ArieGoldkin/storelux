import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import * as authSelectors from "../userComponents/selectors/AuthSelectors";
import Card from "../common/UIElements/Card";
import ProductItem from "./ProductItem";
import Button from "../common/FormElements/Button";
import "./productsCss/ProductList.css";

const ProductsList = (props) => {
  const { userId } = useParams();
  const { currentUserId } = props;

  if (props.items.length === 0) {
    return (
      <>
        {userId === currentUserId ? (
          <div className="product-list center">
            <Card>
              <h2>No Products Found. Maybe add one?</h2>
              <Button to="/product/new">Add Product</Button>
            </Card>
          </div>
        ) : (
          <div className="product-list center">
            <Card>
              <h2>No Products Found.</h2>
            </Card>
          </div>
        )}
      </>
    );
  }
  return (
    <ul className="product-list">
      {props.items.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          creatorId={product.creator}
          category={product.category}
          price={product.price}
          units={product.units}
          description={product.description}
          onDelete={props.onDeleteProduct}
        />
      ))}
    </ul>
  );
};
const mapStateToProps = (state) => {
  return {
    currentUserId: authSelectors.getAuthUserId(state),
  };
};

export default connect(mapStateToProps)(ProductsList);
