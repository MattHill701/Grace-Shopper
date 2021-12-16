import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Cart } from "./";
import "./myStyles.css";
import pic from "./pics/chickenWings.jfif";
import pic1 from "./pics/sharkFinSoup.jfif";
import pic2 from "./pics/rackOfLamb.jfif"
import pic3 from "./pics/petSnackz.jfif";
import pic4 from "./pics/chickenThighs.jfif";
import pic5 from "./pics/chickenBreasts.jfif";
import pic6 from "./pics/porkBacon.jfif";
import pic7 from "./pics/petSnackz.jfif";
import pic8 from "./pics/babyBackRibs.jfif";
import pic9 from "./pics/hotWings.jfif";
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
  let arr = [pic, pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9]
  let count = -1
  return (
    <div>
      <Row>
        <Col md={9} className="mr-auto">
          <div>
            {/* <h1 className="text-center">List of Products</h1> */}
            <div className="products-main-container">
              {allProducts.length
                ? allProducts.map((product) => {

                  count = count + 1
                    // console.log("this is products", product);
                    return (
                      <div className="products-container" key={`${product.id}`}>
                        <div className="listed-product" key={`${product.id}`}>
                        <img src={`${arr[count]}`} className="product_pic"></img>
                      
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
