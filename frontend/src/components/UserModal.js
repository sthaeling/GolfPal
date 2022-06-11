import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class HoleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hole: this.props.hole,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const user = { ...this.state.user, [name]: value };
    this.setState({ user });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>New USer</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="first-name">First name</Label>
              <Input
                type="text"
                id="first-name"
                name="_firstName"
                onChange={this.handleChange}
                placeholder="Enter first name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="last-name">Last name</Label>
              <Input
                type="text"
                id="last-name"
                name="_lastName"
                onChange={this.handleChange}
                placeholder="Enter last name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email address</Label>
              <Input
                type="text"
                id="email"
                name="_email"
                onChange={this.handleChange}
                placeholder="Enter email address"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="_password"
                onChange={this.handleChange}
                placeholder="Enter password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="handicap">Handicap</Label>
              <Input
                type="int"
                id="handicap"
                name="_handicap"
                onChange={this.handleChange}
                placeholder="Enter handicap"
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone-number">Phone</Label>
              <Input
                type="int"
                id="phone-number"
                name="_phoneNumber"
                onChange={this.handleChange}
                placeholder="Enter phone number"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.user)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
