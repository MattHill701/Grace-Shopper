import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Cart } from "./";
import "./myStyles.css";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = ({ allProducts, setAllProducts }) => {
  let count = 0;
  return (
    <div>
      <Row>
        <Col md={9} className="mr-auto">
          <div>
            <h1 className="text-center">List of Products</h1>
            <div className="products-main-container">
              {allProducts.length
                ? allProducts.map((product) => {
                    count + 1;
                    console.log("this is products", product);
                    return (
                      <container className="products-container">
                        <div
                          className="listed-product"
                          key={`this is id of ${product.id}`}
                        >
                          <h3>{product.name}</h3>
                          <p>{product.description}</p>
                          <p> ${product.price}</p>
                        </div>
                      </container>
                    );
                  })
                : null}
            </div>
          </div>
        </Col>
        <Col md={3} className="ml-auto">
          <div className="cart-box">
            <Cart />
            <div className="cart-items">
              <p> ITEM 1: COST </p>
              <p> ITEM 1: COST </p>
              <p> ITEM 1: COST </p>
              <p> ITEM 1: COST </p>
              <p> ITEM 1: COST </p>
              <p> ITEM 1: COST </p>
              <p> ITEM 1: COST </p>
              <p> TOTAL COST : </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Products;
