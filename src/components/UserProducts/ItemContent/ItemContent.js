import React from "react";

import Card from "../../common/UIElements/Card";
import Button from "../../common/FormElements/Button";
import "../css/ItemContent.css";

const ItemContent = (props) => {
  return (
    <Card className="product-item__content">
      <div className="product-item__header">
        <h2>{props.title}</h2>
      </div>
      <div className="product-item__info-wrapper">
        <div className="product-item__info">
          <h4>Category: {props.category}</h4>
          <h4>Price:</h4>
          <p>{`$${props.price}`}</p>
          <h4>Units Available:</h4>
          <p>
            {`${props.units}`} {props.units === 1 ? "unit" : "units"}
          </p>
          <h4>Description:</h4>
          <p>{props.description}</p>
        </div>
        <div className="product-item__image">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`}
            alt={props.title}
          />
        </div>
      </div>
      <div className="product-item__actions">
        <Button inverse onClick={props.openModal}>
          VIEW PRODUCT
        </Button>
        {props.userId === props.creatorId && (
          <Button onClick={props.getInfo}>EDIT</Button>
        )}
        {props.userId === props.creatorId && (
          <Button danger onClick={props.deleteModal}>
            DELETE
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ItemContent;
