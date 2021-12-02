import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./myStyles.css";


const Navigation = ({ isLoggedIn, setIsLoggedIn }) => {
  const history = useHistory();

  return (
    <div>
      <Navbar  variant="primary">
        <Container>
          <Navbar.Brand>
            <Nav.Link
              type="submit"
              onClick={() => {
                history.push("/Home");
              }}
            >
              Grace Shopper
            </Nav.Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link
              type="submit"
              onClick={() => {
                history.push("/Home");
              }}
            >
              Home
            </Nav.Link>
            {isLoggedIn ? null : (
              <Nav.Link
                type="submit"
                onClick={() => {
                  history.push("/Login");
                }}
              >
                Login
              </Nav.Link>
            )}
            {isLoggedIn ? null : (
              <Nav.Link
                type="submit"
                onClick={() => {
                  history.push("/Register");
                }}
              >
                Register
              </Nav.Link>
            )}

            <Nav.Link
              type="submit"
              onClick={() => {
                history.push("/products");
              }}
            >
              Products
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link
                type="submit"
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.clear();
                  history.push("/Login");
                }}
              >
                Logout
              </Nav.Link>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
