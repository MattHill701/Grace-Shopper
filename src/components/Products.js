import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Cart } from "./";
import "./myStyles.css";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = ({allProducts, setAllProducts}) => {
  return (
    <div>
      <Row>
        <Col md={9} className="mr-auto">
          <div>
            <h1 className="text-center">List of Products</h1>
            <ul className="products-main-container">
              {
                allProducts.length 
                ?  allProducts.map((product)=>{
                  console.log("this is products",allProducts)
                  return(
                    <div>
                      <h1>listed Product</h1>
                    </div>
                  )
                }): null
              }
            </ul>
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
