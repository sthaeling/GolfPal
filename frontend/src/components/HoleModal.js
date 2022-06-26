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
      golfCourseId: this.props.golfCourseId,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    let nodes = e.target.parentElement.childNodes;
    nodes.forEach(element => {
      if (element.name === '_golfCourse') {
        const hole = { ...this.state.hole, [element.name]: element.value };
        this.setState({ hole });
        this.state.hole = hole;
      }
    });

    const hole = { ...this.state.hole, [name]: value };
    this.setState({ hole });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Hole</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="hole-number">Hole number</Label>
              <Input
                type="int"
                id="hole-number"
                name="_holeNumber"
                onChange={this.handleChange}
                placeholder="Enter hole number"
              />
            </FormGroup>
            <FormGroup>
              <Label for="par">Par</Label>
              <Input
                type="int"
                id="par"
                name="_par"
                onChange={this.handleChange}
                placeholder="Enter par"
              />
            </FormGroup>
            <FormGroup>
              <Label for="distance">Distance</Label>
              <Input
                type="int"
                id="distance"
                name="_distance"
                onChange={this.handleChange}
                placeholder="Enter hole distance"
              />
            </FormGroup>
            <FormGroup>
              <Label for="hcp">HCP</Label>
              <Input
                type="int"
                id="hcp"
                name="_hcp"
                onChange={this.handleChange}
                placeholder="Enter hole HCP"
              />

              <Input hidden
                     type="text"
                     id="golf-course"
                     name="_golfCourse"
                     defaultValue={this.state.golfCourseId}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.hole)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
