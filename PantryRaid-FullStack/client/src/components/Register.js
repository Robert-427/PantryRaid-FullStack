import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";
import { getAllStatesFromApi } from "../modules/stateManager";

export default function Register() {
  const navigate = useNavigate();

  const [states, setStates] = useState([])
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [stateId, setStateId] = useState();
  const [zipCode, setZipCode] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    getAllStatesFromApi().then(data => setStates(data));
  }, []);

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        firstName,
        lastName,
        displayName,
        email,
        address,
        city,
        stateId,
        zipCode,
        isAdmin
      };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return (
    <div className="container">
        <Form onSubmit={registerClick}>
        <fieldset>
            <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
                id="firstName"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
                id="lastName"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
                id="displayName"
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
            <Label for="email">Email</Label>
            <Input
                id="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="address">Street Address</Label>
            <Input
                id="address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
            <Label htmlFor="city">City</Label>
            <Input
                id="city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
                <Label for="state">State:</Label>
                <UncontrolledDropdown className="me-2" direction="down">
                    <DropdownToggle caret color="light" >
                        Pick your State
                    </DropdownToggle>
                    <DropdownMenu className="sort-dropdown">
                        {states.map(state => {
                            return (
                                <DropdownItem key={state.id} value={state.id} className="state--name" 
                                onClick={(e) => setStateId(e.target.value)}
                                >
                                    {state.name}
                                </DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </FormGroup>
            <FormGroup>
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
                id="zipCode"
                type="number"
                onChange={(e) => setZipCode(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
            <Label for="password">Password</Label>
            <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
                id="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </FormGroup>
            <FormGroup>
            <Button>Register</Button>
            </FormGroup>
        </fieldset>
        </Form>
    </div>
  );
}
