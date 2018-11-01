import React, { Component } from 'react';
import axios from 'axios';

class SingleProject extends Component {
    constructor (props) {
        super(props);
        this.state = {
            project: {},
            tasks:[],
        };
        this.handleMarkProjectAsCompleted = this.handleMarkProjectAsCompleted.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleAddNewTask = this.handleAddNewTask.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    this.state = {
        ...,
        title: '',
        erros: []
    }

    componentDidMount () {
        const projectId =   this.props.match.params.id

        axios.get(`/api/projects/${projectId}`).then(response => {
            this.setState({
                project: response.data,
                tasks: response.data.tasks
            });
        });
    }

    handleMarkProjectAsCompleted () {
        const { history } = this.props;

        axios.put(`/api/projects/${this.state.project.id}`)
            .then(response = history.push('/'));
    }

    handleFieldChange (event) {
        this.setState({
            title: event.target.value
        });
    }

    handleAddNewTask () {
        event.preventDefaul();

        const task = {
            title: this.state.title,
            project_id: this.state.project.id
        };

        axios.post('/api/tasks', task)
            .then(response => {
                // Clear form input
                this.setState({
                    title: '';
                });
                // Add new task to list of task
                this.setState(prevState => {
                    tasks: prevState.tasks.concat(response.data)
                });
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
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }

    }

    render () {
        const { project, tasks } = this.state
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">{project.name}</div>
                            <div className="card-body">
                                <p>{project.description}</p>

                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={this.handleMarkProjectAsCompleted}
                                >
                                    Mark as completed
                                </button>

                                <hr />
                                <form onSubmit={this.handleAddNewTask}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Task title"
                                            value={this.state.title}
                                            onChange={this.handleFieldChange}
                                            className={`form-control ${this.hasErrorFor('title') ? 'is-invalud' : ''}`}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary">
                                                Add
                                            </button>
                                        </div>
                                        {this.renderErrorFor('title')}
                                    </div>
                                </form>

                                <ul className"list-group mt-3">
                                    {tasks.map(task => (
                                        <li
                                            key={task.id}
                                            className="list-group-item d-flex justify-content-between align-item-center"
                                        >
                                            {task.title}

                                            <button className="btn btn-sm btn-primary">
                                                Mark as completed
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleProject;
