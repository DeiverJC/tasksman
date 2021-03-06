import React, { Component } from 'react';
import axios from 'axios';

class NewProject extends Component {
    constructor () {
        super();
        this.state = {
            name: '',
            desription: '',
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCreateNewProject (event) {
        event.preventDefault();

        const { history } = this.props;

        const project = {
            name: this.state.name,
            description: this.state.description
        };

        axios.post('/api/projects', project)
            .then(response => {
                history.push('/'); // Redirect to the homepage
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    hasErrorFor (field) {
        return !!this.state.errors[field];
    }

    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    render () {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Create new project</div>
                            <div className="card-body">
                                <form onSubmit={this.handleCreateNewProject}>
                                    <div className="form-group">
                                        <label htmlFor="name">Project name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                        />
                                        {this.renderErrorFor('name')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Project description</label>
                                        <textarea
                                            rows="10"
                                            id="description"
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleFieldChange}
                                            className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                        />
                                        {this.renderErrorFor('description')}
                                    </div>
                                    <button className="btn btn-primary">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewProject;
