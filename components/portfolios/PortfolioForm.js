import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Alert, Button } from 'reactstrap';

import PortfolioInput from './../form/PortfolioInput';
import PortfolioDate from './../form/PortfolioDate';
import moment from 'moment';

const INITIAL_VALUES = {
    title: '',
    company: '',
    location: '',
    position: '',
    description: '',
    startDate: '',
    endDate: ''
}; 

const validateInputs = values => {
    let errors = {};

    Object.entries(values).forEach(([key, value]) => {
        if(['endDate'].indexOf(key) === -1){
            if(!values[key]){
                errors[key] = `Field "${key}" is required!`
            }
        }
    });

    const { startDate, endDate } = values;
    if(startDate && endDate && endDate.isBefore(startDate)){
        errors.endDate = 'End date cannot be before start date!'
    }

    return errors;
};

const PortfolioForm = ({ onSubmit, error }) => (
    <div>
        { error &&
            <Alert color="danger">{error}</Alert>
        }
        <Formik
            initialValues={INITIAL_VALUES}
            validate={validateInputs}
            onSubmit={onSubmit} >
            
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="title" label="Title" component={PortfolioInput} />
                    <Field type="text" name="company" label="Company" component={PortfolioInput} />
                    <Field type="text" name="location" label="Location" component={PortfolioInput} />
                    <Field type="text" name="position" label="Position" component={PortfolioInput} />
                    <Field component="textarea" name="description" label="Description" component={PortfolioInput} />
                    <Field name="startDate" label="Start date" component={PortfolioDate} />
                    <Field name="endDate" label="End date" component={PortfolioDate} canBeDisabled />
                    
                    <Button color="success" size="lg" type="submit" disabled={isSubmitting}>Create</Button>
                </Form>
            )}
        </Formik>
    </div>
);

export default PortfolioForm;





























/* import React, { Component } from 'react';

export default class PortfolioForm extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            language: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const key = event.target.name;
        this.setState({[key]: event.target.value});
    }

    handleSubmit(event) {
        alert(this.state.title + '\n' + this.state.description + '\n' + this.state.language);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name: <input name="title" type="text" value={this.state.value} onChange={this.handleChange} /></label>
                <label>Description: <textarea name="description" value={this.state.description} onChange={this.handleChange} /></label>
                <label>
                    Pick your favorite language:
                    <select name="language" value={this.state.language} onChange={this.handleChange}>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="php">PHP</option>
                    <option value="python">Python</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
} */