import React, { Component, Fragment } from "react";
import moment from 'moment';
import DatePicker from "react-datepicker";
import { FormGroup, Label, Button } from 'reactstrap';

import "react-datepicker/dist/react-datepicker.css";

export default class PortfolioDate extends Component {

    constructor(props){
        super(props);

        const dateValue = props.initialDate ? moment(props.initialDate) : moment();

        this.state = {
            dateValue,
            isHidden: false
        };
    }

    setFieldValueAndTouched(date, touched){
        const { setFieldValue, setFieldTouched } = this.props.form;
        const { name } = this.props.field;
        
        setFieldValue(name, date, true);
        setFieldTouched(name, touched, true);
    }

    handleChange = date => {
        this.setState({
            dateValue: date
        });

        this.setFieldValueAndTouched(date, true);
    }

    toggleDate(date){
        this.setState({
            isHidden: !this.state.isHidden
        });

        this.setFieldValueAndTouched(date, true);
    }

    render() {
        const { label, field, form: { touched, errors }, canBeDisabled } = this.props;
        const { dateValue, isHidden } = this.state;

        return (
            <FormGroup>
                <Label>{label}</Label>
                <div>
                    { !isHidden &&
                        <DatePicker
                            className="form-control"
                            selected={dateValue}
                            onChange={this.handleChange}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            maxDate={moment()}
                            dropdownMode="select"
                        />
                    }
                </div>
                { canBeDisabled && !isHidden &&
                    <Button onClick={() => this.toggleDate(null)}>Still working here?!</Button>
                }
                { canBeDisabled && isHidden &&
                    <Fragment>
                        <span>Still working here.</span>
                        <Button onClick={() => this.toggleDate(dateValue)}>Not working here?!</Button>
                    </Fragment>
                }
                {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
            </FormGroup>
        );
    }
}