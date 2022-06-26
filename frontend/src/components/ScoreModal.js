import React, {Component} from "react";
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

export default class ScoreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.score,
            golfCourseId: this.props.golfCourseId,
            holes: this.props.holes,
        };
    }

    handleChange = (e) => {
        let {name, value} = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        let nodes = e.target.parentElement.childNodes;
        nodes.forEach(element => {
            if (element.name === '_golfCourse') {
                const score = {...this.state.score, [element.name]: element.value};
                this.setState({score});
                this.state.score = score;
            }
        });

        const score = {...this.state.score, [name]: value};
        this.setState({score});
    };

    render() {
        const {toggle, onSave} = this.props;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>New Game</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>

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
