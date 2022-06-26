import React, {Component,  useEffect, useState} from "react";
import Modal from "./components/Modal";
import ClubModal from "./components/ClubModal";
import CourseModal from "./components/CourseModal";
import HoleModal from "./components/HoleModal";
import UserModal from "./components/UserModal";
import ScoreModal from "./components/ScoreModal";
import axios from 'axios';

class App extends Component {
    constructor(props) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true

        super(props);
        this.state = {
            viewCompleted: false,
            golfClubs: [],
            golfCourses: [],
            golfClub: {},
            holes: {},
            users: {},
            modal: false,
            scoreModal: false,
            activeUser: '',
            currentPage: 'golfclub',
            previousModelId: 0,
            currentModelId: 0,
            activeItem: {
                title: "",
                description: "",
                completed: false,
            },
            courseParTotal: 0,
            courseDistanceTotal: 0,
        };
    }

    availabePages = {
        user: 'user',
        golfclub: 'golfclub',
        golfcourse: 'golfcourse',
        hole: 'hole',
        holeScores: 'holeScore',
    }

    componentDidMount() {
        this.refreshCurrentModel(this.state.currentPage, null);
    }

    refreshCurrentModel = (model, modelId) => {
        switch (model) {
            case 'golfclub':
                this.loadGolfClubData(model);
                break;
            case 'golfcourse':
                if (!modelId) {
                    modelId = this.state.previousModelId;
                }
                this.loadGolfCourseData(model, modelId);
                break;
            case 'hole':
                if (!modelId) {
                    modelId = this.state.previousModelId;
                }
                this.loadHoleData(model, modelId);
                break;
            case 'user':
                this.loadUserData(model, modelId);
                break;
        }
    };

    loadGolfClubData = (model) => {
        axios
            .get(`/api/${model}/`)
            .then((res) => this.setState({golfClubs: res.data}))
            .catch((err) => alert(err));
    }

    /**
     * Loads course data and populates with holes and calculations for total par and distance
     * @param model
     * @param golfClubId
     */
    loadGolfCourseData = (model, golfClubId) => {
        axios
            .get(`/api/${model}?_golfClub=${golfClubId}`)
            .then(async (res) => {
                for (let course of res.data) {
                    await axios
                        .get(`/api/hole?_golfCourse=${course.id}`)
                        .then(async (res) => {
                            this.state.holes = res.data;

                            course.totalPar = 0;
                            course.totalDistance = 0;
                            course.holes = [];

                            res.data.forEach(hole => {
                                course.totalPar += hole._par;
                                course.totalDistance += hole._distance;
                                course.holes.push(hole);
                            });

                        })
                        .catch((err) => alert(err));
                }

                this.setState({golfCourses: res.data});
            })
            .catch((err) => alert(err));
    }

    loadHoleData = (model, golfCourseId) => {
        axios
            .get(`/api/${model}?_golfCourse=${golfCourseId}`)
            .then((res) => this.setState({holes: res.data}))
            .catch((err) => alert(err));
    }

    loadUserData = (model, id) => {
        axios
            .get(`/api/${model}`)
            .then((res) => this.setState({users: res.data}))
            .catch((err) => alert(err));
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };

    handleSubmit = (item) => {
        this.toggle();

        if (item.id) {
            axios
                .put(`/api/${this.state.currentPage}/${item.id}/`, item)
                .then((res) => this.refreshCurrentModel(this.state.currentPage));
            return;
        }
        axios
            .post(`/api/${this.state.currentPage}/`, item)
            .then((res) => this.refreshCurrentModel(this.state.currentPage))
            .catch((err) => {
                alert(err.response.statusText + ': ' + JSON.stringify(err.response.data));
            });
    };

    handleGolfCourseSelection = (golfClubId) => {
        this.state.currentPage = this.availabePages.golfcourse;
        this.state.previousModelId = golfClubId;
        this.refreshCurrentModel(this.state.currentPage, golfClubId);
    };

    handleHoleSelection = (golfCourseId) => {
        this.state.currentPage = this.availabePages.hole;
        this.state.previousModelId = golfCourseId;
        this.refreshCurrentModel(this.state.currentPage, golfCourseId);
    };

    handleNewScoreSelection = (golfCourseId) => {
        this.state.currentPage = this.availabePages.holeScores;
        this.state.previousModelId = golfCourseId;
        this.refreshCurrentModel(this.state.currentPage, golfCourseId);
    }

    handleUserSelection = (id) => {
        this.state.currentPage = this.availabePages.user;
        this.state.previousModelId = null;
        this.refreshCurrentModel(this.state.currentPage, id);
    }

    handleViewSelection = (holeId) => {
        alert(holeId);
    }

    createItem = (scoreModal = false) => {
        if (scoreModal) {
            this.setState({scoreModal: !this.state.scoreModal});
        } else {
            this.setState({modal: !this.state.modal});
        }
    };

    /**
     * TODO Add authentication mechanism so admin can edit and delete entries
     * @param item
     */
    editItem = (item) => {
        this.setState({modal: !this.state.modal});
    };
    handleDelete = (item, model) => {
        axios
            .delete(`/api/${model}/${item.id}/`)
            .then((res) => this.refreshCurrentModel(model));
    };

    renderGolfClubItems = (newItems) => {
        return newItems.map((item) => (
            <li key={item.id}
                className="d-flex justify-content-between flex-column align-items-center mb-3 card">
                <div className="item-header col-12 d-flex flex-row justify-content-space-between mt-3 mr-3 ml-3">
                    <div className="golfclub-title-container col-11">
                        <h2
                            className='golfclub-title mr-2 mt-3 mb-3'
                            title={item._name}
                        >
                            {item._name}
                        </h2>
                    </div>
                    <div className="golfclub-image-container">
                        <img src={item._imageUrl} className="mh-100 mw-100 golfclub-image img-fluid" alt={item._name}/>
                    </div>
                </div>
                <div className="item-body col-12 d-flex">
                    <div className="d-flex justify-content-start flex-row col-6 align-items-end card mb-3">
                        <div className="item-body-address col-6 m-0 p-0">
                            <p className="street-nr mt-3">{item._streetHouseNumber}</p>
                            <p className="zip-city">{item._zip} {item._city}</p>
                            <p>Tel: {item._phoneNumber}</p>
                        </div>
                        <div className="item-body-web col-6 text-right mt-3">
                            <p><a href={item._website} target='_blank'>Visit website</a></p>
                            <p><a href={'mailto:' + item._email}>Write mail</a></p>
                        </div>
                    </div>
                    <div className="item-body-select col-6 mb-3 pr-0 d-flex flex-column justify-content-end">
                        <div className="d-flex flex-row justify-content-end">
                            <button onClick={() => this.handleGolfCourseSelection(item.id)}
                                    className="btn btn-primary float-right float-bottom">
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        ));
    }

    renderGolfCourseItems = (newItems) => {
        return newItems.map((item) => (
            <li key={item.id}
                className="d-flex justify-content-between flex-column align-items-center card mb-3">
                <div className="item-header col-12 d-flex flex-row justify-content-between mt-3 mr-3 ml-3">
                    <div className="golfclub-title-container d-flex justify-content-between flex-row col-11">
                        <h2
                            className='golfclub-title mr-2 mt-3 mb-3'
                            title={item._name}
                        >
                            {item._name}
                        </h2>
                        <h3 className="golfclub-title mr-2 mt-3 mb-3">{item._holesAmount} holes</h3>
                    </div>
                </div>
                <div className="item-body col-12 d-flex">
                    <div className="d-flex justify-content-start flex-row col-6 align-items-center">
                        <div className="item-body-court col-6 m-0 p-0">
                            <p className="item-body-court-entry par">Total par: {item.totalPar}</p>
                            <p className="item-body-court-entry distance">Total distance: {item.totalDistance} m</p>
                        </div>
                        <div className="item-body-user col-6 text-right mt-3">
                        </div>
                    </div>
                    <div className="item-body-select col-6 mb-3 pr-0 d-flex flex-column justify-content-end">
                        <div className="d-flex flex-row justify-content-end">
                            <button onClick={() => this.createItem(true)}
                                    className="btn btn-primary float-right float-bottom mr-2">
                                Add new game
                            </button>
                            <button onClick={() => this.handleHoleSelection(item.id)}
                                    className="btn btn-secondary float-right float-bottom">
                                View course holes
                            </button>
                        </div>
                    </div>
                </div>

                {this.state.scoreModal ? (
                    <ScoreModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                        golfCourseId={this.state.previousModelId}
                        holes={item.holes}
                    />
                ) : null}
            </li>
        ));
    }

    renderHoleItems = (newItems) => {
        return newItems.map((item) => (
            <li key={item.id}
                className="d-flex justify-content-between flex-column align-items-center card mb-3">
                <div className="item-header col-12 d-flex flex-row justify-content-between mt-3 mr-3 ml-3">
                    <div className="golfclub-title-container d-flex justify-content-between flex-row col-11">
                        <h2
                            className='golfclub-title mr-2 mt-3 mb-3'
                            title={item._holeNumber}
                        >
                            Hole {item._holeNumber}
                        </h2>
                        <h3 className="golfclub-title mr-2 mt-3 mb-3">Par {item._par}</h3>
                    </div>
                </div>
                <div className="item-body col-12 d-flex">
                    <div className="d-flex justify-content-start flex-row col-6 align-items-center">
                        <div className="item-body-court col-6 m-0 p-0">
                            <h4 className="item-body-court-entry distance">Distance: {item._distance} m</h4>
                            <h4 className="item-body-court-entry handicap">Handicap: {item._hcp}</h4>
                        </div>
                        <div className="item-body-user col-6 text-right mt-3">
                        </div>
                    </div>
                    <div className="item-body-select col-6 mb-3 pr-0 d-flex flex-column justify-content-end">
                        <div className="d-flex flex-row justify-content-end">
                            <button onClick={() => this.handleViewSelection(item.id)}
                                    className="btn btn-primary float-right float-bottom">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        ));
    }

    renderUserItems = (newItems) => {
        return newItems.map((item) => (
            <li key={item.id}
                className="d-flex justify-content-between flex-column align-items-center card mb-3">
                <div className="item-header col-12 d-flex flex-row justify-content-between mt-3 mr-3 ml-3">
                    <div className="golfclub-title-container d-flex justify-content-between flex-row col-11">
                        <h2
                            className='golfclub-title mr-2 mt-3 mb-3'
                            title={item._firstName + ' ' + item._lastName}
                        >
                            User {item._firstName + ' ' + item._lastName}
                        </h2>
                        <h3 className="golfclub-title mr-2 mt-3 mb-3">Handicap: {item._handicap}</h3>
                    </div>
                </div>
                <div className="item-body col-12 d-flex">
                    <div className="d-flex justify-content-start flex-row col-6 align-items-center">
                        <div className="item-body-court col-6 m-0 p-0">
                            <h4 className="item-body-court-entry distance">
                                <a href={'mailto:' + item._email}>Email: {item._email}</a>
                            </h4>
                            <h4 className="item-body-court-entry handicap">Phone: {item._phoneNumber}</h4>
                        </div>
                        <div className="item-body-user col-6 text-right mt-3">
                        </div>
                    </div>
                    <div className="item-body-select col-6 mb-3 pr-0 d-flex flex-column justify-content-end">
                        <div className="d-flex flex-row justify-content-end">
                            <button onClick={() => this.handleViewSelection(item.id)}
                                    className="btn btn-primary float-right float-bottom">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        ));
    }

    renderItems = (currentPage, previousModelId) => {
        let newItems = this.state.golfClubs;

        switch (currentPage) {
            case 'golfclub':
                newItems = this.state.golfClubs;
                return this.renderGolfClubItems(newItems);
            case 'golfcourse':
                newItems = this.state.golfCourses;
                return this.renderGolfCourseItems(newItems);
            case 'hole':
                newItems = this.state.holes;
                return this.renderHoleItems(newItems);
            case 'user':
                newItems = this.state.users;
                return this.renderUserItems(newItems);
        }
    };

    render() {
        let golfClubHtml = (
            <main className="container">
                <a className="btn btn-secondary mt-3 mr-2" href="/">Home</a>
                <button className="btn btn-secondary mt-3"
                        onClick={() => this.handleUserSelection(null)}
                >
                    User
                </button>
                <h1 className="text-black text-uppercase text-center my-4">Golf clubs</h1>
                <p className="text-black text-center my-4">Select a golf club or create a new one to proceed</p>
                <div className="row">
                    <div className="col-md-10 col-sm-10 mx-auto p-0">
                        <div className="p-3">
                            <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems(this.state.currentPage, this.state.previousModelId)}
                            </ul>
                            <div className="mb-3 mt-3 d-flex flex-row justify-content-center">
                                <button
                                    className="btn btn-primary w-25"
                                    onClick={this.createItem}
                                >
                                    Add new club
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <ClubModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        );

        let golfCourseHtml = (
            <main className="container">
                <a className="btn btn-secondary mt-3 mr-2" href="/">Home</a>
                <button className="btn btn-secondary mt-3"
                        onClick={() => this.handleUserSelection(null)}
                >
                    User
                </button>
                <h1 className="text-black text-uppercase text-center my-4">Golf courses</h1>
                <p className="text-black text-center my-4">Select a golf course or create a new one to proceed</p>
                <div className="row">
                    <div className="col-md-10 col-sm-10 mx-auto p-0">
                        <div className="p-3">
                            <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems(this.state.currentPage)}
                            </ul>
                            <div className="mb-3 mt-3 d-flex flex-row justify-content-center">
                                <button
                                    className="btn btn-primary w-25"
                                    onClick={this.createItem}
                                >
                                    Add new course
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <CourseModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                        golfClubId={this.state.previousModelId}
                    />
                ) : null}
            </main>
        );

        let holesHtml = (
            <main className="container">
                <a className="btn btn-secondary mt-3 mr-2" href="/">Home</a>
                <button className="btn btn-secondary mt-3"
                        onClick={() => this.handleUserSelection(null)}
                >
                    User
                </button>
                <h1 className="text-black text-uppercase text-center my-4">Holes</h1>
                <p className="text-black text-center my-4">Select a hole to view scores or create a new hole to proceed</p>
                <div className="row">
                    <div className="col-md-10 col-sm-10 mx-auto p-0">
                        <div className="p-3">
                            <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems(this.state.currentPage)}
                            </ul>
                            <div className="mb-3 mt-3 d-flex flex-row justify-content-center">
                                <button
                                    className="btn btn-primary w-25"
                                    onClick={this.createItem}
                                >
                                    Add new hole
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <HoleModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                        golfCourseId={this.state.previousModelId}
                    />
                ) : null}
            </main>
        );

        let userHtml = (
            <main className="container">
                <a className="btn btn-secondary mt-3 mr-2" href="/">Home</a>
                <button className="btn btn-secondary mt-3"
                        onClick={() => this.handleUserSelection(null)}
                >
                    User
                </button>
                <h1 className="text-black text-uppercase text-center my-4">Users</h1>
                <p className="text-black text-center my-4">Select a user to view scores or create a new user to proceed</p>
                <div className="row">
                    <div className="col-md-10 col-sm-10 mx-auto p-0">
                        <div className="p-3">
                            <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems(this.state.currentPage)}
                            </ul>
                            <div className="mb-3 mt-3 d-flex flex-row justify-content-center">
                                <button
                                    className="btn btn-primary w-25"
                                    onClick={this.createItem}
                                >
                                    Add new user
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <UserModal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>
        );

        switch (this.state.currentPage) {
            case 'golfclub':
                return golfClubHtml;
            case 'golfcourse':
                return golfCourseHtml;
            case 'hole':
                return holesHtml;
            case 'user':
                return userHtml;
        }
        return;
    }
}

export default App;
