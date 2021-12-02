import React, { useState } from "react";
import { Form, Button, Col, ButtonToolbar, FormGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { loginUser } from "../api";

const Login = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
let history = useHistory()

let [password, setPassword] = useState("");
  return (
    <div className="Login">
      <Col md={{ span: 4, offset: 2 }} className="Login">
      Login Form
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const { data } = await loginUser(username, password);
            setUsername("");
            setPassword("");
            setIsLoggedIn(true);
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