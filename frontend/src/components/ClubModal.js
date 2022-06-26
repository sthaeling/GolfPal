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

export default class ClubModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            golfClub: this.props.golfClub,
        };
    }

    handleChange = (e) => {
        let {name, value} = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const golfClub = {...this.state.golfClub, [name]: value};

        this.setState({golfClub});
    };

    render() {
        const {toggle, onSave} = this.props;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>New Club</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="club-name">Name</Label>
                            <Input
                                type="text"
                                id="club-name"
                                name="_name"
                                onChange={this.handleChange}
                                placeholder="Enter club name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="club-street-nr">Street and House number</Label>
                            <Input
                                type="text"
                                id="club-street-nr"
                                name="_streetHouseNumber"
                                onChange={this.handleChange}
                                placeholder="Enter club street and house nr"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="club-zip">ZIP</Label>
                            <Input
                                type="text"
                                id="club-zip"
                                name="_zip"
                                onChange={this.handleChange}
                                placeholder="Enter club zip"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="club-city">City</Label>
                            <Input
                                type="text"
                                id="club-city"
                                name="_city"
                                onChange={this.handleChange}
                                placeholder="Enter city"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="club-website">Website</Label>
                            <Input
                                type="url"
                                id="club-website"
                                name="_website"
                                onChange={this.handleChange}
                                placeholder="Enter club website url"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="club-email">Email</Label>
                            <Input
                                type="email"
                                id="club-email"
                                name="_email"
                                onChange={this.handleChange}
                                placeholder="Enter club website email"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="club-phone-number">Phone number</Label>
                            <Input
                                type="text"
                                id="club-phone-number"
                                name="_phoneNumber"
                                onChange={this.handleChange}
                                placeholder="Enter club website phone number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="club-phone-image">Image url</Label>
                            <Input
                                type="text"
                                id="club-image"
                                name="_imageUrl"
                                onChange={this.handleChange}
                                placeholder="Enter club website image url"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => onSave(this.state.golfClub)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
