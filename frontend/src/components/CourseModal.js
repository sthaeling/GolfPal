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

export default class CourseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      golfCourse: this.props.golfCourse,
      golfClubId: this.props.golfClubId,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    let nodes = e.target.parentElement.childNodes;
    nodes.forEach(element => {
      if (element.name === '_golfClub') {
        const golfCourse = { ...this.state.golfCourse, [element.name]: element.value };
        this.setState({ golfCourse });
        this.state.golfCourse = golfCourse;
      }
    });

    const golfCourse = { ...this.state.golfCourse, [name]: value };
    this.setState({ golfCourse });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>New Club</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="course-name">Course Name</Label>
              <Input
                type="text"
                id="course-name"
                name="_name"
                onChange={this.handleChange}
                placeholder="Enter course name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="holes-amount">Amount of holes</Label>
              <Input
                type="int"
                id="holes-amount"
                name="_holesAmount"
                onChange={this.handleChange}
                placeholder="Enter amount of holes"
              />

              <Input hidden
                     type="text"
                     id="golf-club"
                     name="_golfClub"
                     defaultValue={this.state.golfClubId}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.golfCourse)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
