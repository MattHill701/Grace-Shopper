import React, { useState } from "react";
import { Form, Button, Col, ButtonToolbar, FormGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { loginUser } from "../api";
import { storeToken, storeUser } from "../auth";
import "./myStyles.css";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  let history = useHistory();
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  return (
    <div className="Login">
      <Col md={{ span: 4, offset: 2 }} className="Login">
      Login Form
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const activeUser = await loginUser(username, password);
            // console.log("this is activeUser", activeUser)
            storeUser(activeUser)
            storeToken(activeUser)
            setUsername("");
            setPassword("");
          } catch (error) {
            console.log(error.message);
          } finally {
            setIsLoggedIn(true);
            history.push("/Home");
          }
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="usernames"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label> enter password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>
        <ButtonToolbar className="mb-2">
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Button
            variant="secondary"
            type="submit"
            onClick={(e) => {
              history.push("/Register");
            }}
          >
            Don't have an account?
          </Button>
        </ButtonToolbar>
      </Form>
    </Col>
    </div>
  );
};

export default Login;
