import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <div className="login">
        <div className="container">
            <Form onSubmit={loginSubmit}>
            <fieldset>
                <FormGroup>
                <Label for="email"><h6>Email</h6></Label>
                <Input
                    id="email"
                    type="text"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                />
                </FormGroup>
                <FormGroup>
                <Label for="password"><h6>Password</h6></Label>
                <Input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                </FormGroup>
                <FormGroup>
                <Button><h6>Login</h6></Button>
                </FormGroup>
                <em>
                <h6>Not registered? <Link to="/register">Register</Link></h6>
                </em>
            </fieldset>
            </Form>
        </div>
    </div>
  );
}