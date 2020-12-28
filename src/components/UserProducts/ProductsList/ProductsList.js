import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getAuthUserId } from "../../../store/selectors";

import Card from "../../../components/common/UIElements/Card";
import ProductItem from "../../../containers/UserProducts/ProductItem/ProductItem";
import Button from "../../../components/common/FormElements/Button";
import "../css/ProductList.css";

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
      {props.items.map((product, index) => (
        <ProductItem
          index={index}
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
    currentUserId: getAuthUserId(state),
  };
};

export default connect(mapStateToProps)(ProductsList);
