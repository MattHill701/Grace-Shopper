import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Cart } from "./";
import "./myStyles.css";

import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import {
  addProductToOrder,
  finishCart,
  getOrderById,
  getAllOrders,
} from "../api";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useHistory } from "react-router-dom";
import { getUser } from "../auth";
import CartProductPage from "./CartProductPage";

const Products = ({ allProducts, setAllProducts }) => {
  let history = useHistory()
  // const [order, setOrder] = useState([]);
  // console.log("this is allProducts",allProducts)
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
                        <div className="listed-product" key={`${product.id}`}>
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
                          <Button
                            type="submit"
                            onClick={async (e) => {
                              let user = getUser();
                              addProductToOrder(true, product.id, user.userId);
                               history.push("/products")
                            }}
                          >
                            +
                          </Button>
                          <Button
                          className="productremovebutton"
                            type="submit"
                            onClick={async (e) => {
                              let user = getUser();
                              addProductToOrder(false, product.id, user.userId);
                               history.push("/products")
                            }}
                          >
                            -
                          </Button>
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
            <div className="cart-items">
              <CartProductPage />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Products;
