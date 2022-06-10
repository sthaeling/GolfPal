import React, { Component } from "react";
import Modal from "./components/Modal";
import CourseModal from "./components/NewCourseModal";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
              viewCompleted: false,
              golfClubs: [],
              golfCourses: [],
              modal: false,
              activeUser: '',
              currentPage: 'golfclub',
              activeItem: {
                    title: "",
                    description: "",
                    completed: false,
              },
        };
    }

    availabePages = {
        user: 'user',
        golfclub: 'golfclub',
        golfcourse: 'golfcourse',
        holes: '',
        holeScores: '',
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
                this.loadGolfCourseData(model, modelId);
                break;
        }
    };

    loadGolfClubData = (model) => {
        axios
          .get(`/api/${model}/`)
          .then((res) => this.setState({ golfClubs: res.data }))
          .catch((err) => console.log(err));
    }

    loadGolfCourseData = (model, golfClubId) => {
        axios
          .get(`/api/${model}?_golfClub=${golfClubId}`)
          .then((res) => this.setState({ golfCourses: res.data }))
          .catch((err) => console.log(err));
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleSubmit = (item, model) => {
        this.toggle();

        if (item.id) {
              axios
                .put(`/api/${model}/${item.id}/`, item)
                .then((res) => this.refreshCurrentModel(model));
              return;
        }
        axios
            .post(`/api/${model}/`, item)
            .then((res) => this.refreshCurrentModel(model));
    };

    handleGolfClubSelection = (golfClubId) => {
        this.state.currentPage = this.availabePages.golfcourse;
        this.refreshCurrentModel(this.state.currentPage, golfClubId);
    };

    handleDelete = (item, model) => {
        axios
            .delete(`/api/${model}/${item.id}/`)
            .then((res) => this.refreshCurrentModel(model));
    };

    createItem = () => {
        const item = { title: "", description: "", completed: false };

        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    editItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    renderGolfClubItems = (newItems) => {
        return newItems.map((item) => (
            <li key={item.id}
            className="d-flex justify-content-between flex-column align-items-center card">
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
                    <div className="d-flex justify-content-start flex-row col-6 align-items-center card mb-3">
                        <div className="item-body-address col-6 m-0 p-0">
                            <p className="street-nr mt-3">{item._streetHouseNumber}</p>
                            <p className="zip-city">{item._zip} {item._city}</p>
                        </div>
                        <div className="item-body-web col-6 text-right mt-3">
                            <p><a href={item._website} target='_blank'>Visit website</a></p>
                            <p><a href={'mailto:' + item._email}>Write mail</a></p>
                        </div>
                    </div>
                    <div className="item-body-select col-6 mb-3 pr-0 d-flex flex-column justify-content-end">
                        <div className="d-flex flex-row justify-content-end">
                            <button onClick={() => this.handleGolfClubSelection(item.id)} className="btn btn-primary float-right float-bottom">
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
            className="d-flex justify-content-between flex-column align-items-center card">
                <div className="item-header col-12 d-flex flex-row justify-content-space-between mt-3 mr-3 ml-3">
                    <div className="golfclub-title-container col-11">
                        <h2
                          className='golfclub-title mr-2 mt-3 mb-3'
                          title={item._name}
                        >
                            {item._name}
                        </h2>
                    </div>
                </div>
                <div className="item-body col-12 d-flex">
                    <div className="d-flex justify-content-start flex-row col-6 align-items-center card mb-3">
                        <div className="item-body-address col-6 m-0 p-0">
                            <p className="street-nr mt-3">{item._streetHouseNumber}</p>
                            <p className="zip-city">{item._zip} {item._city}</p>
                        </div>
                        <div className="item-body-web col-6 text-right mt-3">
                            <p><a href={item._website} target='_blank'>Visit website</a></p>
                            <p><a href={'mailto:' + item._email}>Write mail</a></p>
                        </div>
                    </div>
                    <div className="item-body-select col-6 mb-3 pr-0 d-flex flex-column justify-content-end">
                        <div className="d-flex flex-row justify-content-end">
                            <button onClick={() => this.handleGolfClubSelection(item.id)} className="btn btn-primary float-right float-bottom">
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        ));
    }

    renderItems = (currentPage) => {
        const { viewCompleted } = this.state;
        let newItems = this.state.golfClubs;

        switch (currentPage) {
            case 'golfclub':
                newItems = this.state.golfClubs;
                return this.renderGolfClubItems(newItems);
                break;
            case 'golfcourse':
                newItems = this.state.golfCourses;
                return this.renderGolfCourseItems(newItems);
                break;
        }
    };

    render() {
        let golfClubHtml = (
            <main className="container">
                <a className="btn btn-secondary mt-3" href="/">Home</a>
                <h1 className="text-black text-uppercase text-center my-4">Golf clubs</h1>
                <p className="text-black text-center my-4">Select a golf club or create a new one to proceed</p>
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
                                    Add new club
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
                  />
                ) : null}
            </main>
        );

        let golfCourseHtml = (
            <main className="container">
                <a className="btn btn-secondary mt-3" href="/">Home</a>
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
            </main>
        );

        switch (this.state.currentPage) {
            case 'golfclub':
                return golfClubHtml;
            case 'golfcourse':
                return golfCourseHtml
        }
        return;
    }
}

export default App;
