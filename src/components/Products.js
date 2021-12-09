import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Cart } from "./";
import "./myStyles.css";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import { addProductToOrder } from "../api";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { getUser } from "../auth";
const Products = ({ allProducts, setAllProducts }) => {
  let count = 0;
  return (
    <div>
      <Row>
        <Col md={9} className="mr-auto">
          <div>
            {/* <h1 className="text-center">List of Products</h1> */}
            <div className="products-main-container">
              {allProducts.length
                ? allProducts.map((product) => {
                    // console.log("this is products", product);
                    return (
                      <div className="products-container" key={`${product.id}`}>
                        <div
                          className="listed-product"
                          key={`${product.id}`}
                        >
                          <h3>
                            <Link
                              to={`/products/${product.id}`}
                              key={product.id}
                              className="product_link"
                            >
                              {product.name}
                            </Link>
                          </h3>
                          <p>{product.description}</p>
                          <p>${product.price}</p>
                          <Button type="submit" onClick={(e)=>{
                           let user = getUser()
                           console.log("this is current userId",user.userId)
                           addProductToOrder(product.id, user.userId)
                          }}>+</Button>
                        </div>
                      </div>
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
