import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { setPropAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './CustomersActions'
import { accessControl } from '../helpers/accessControl';
import { CUSTOMER_EDIT } from '../constants/permissions';
// import { Prompt } from 'react-router-dom';

function withRouter(Component) {
    function ComponentWithRouter(props) {
        //   debugger;
        return <Component {...props} />
    }
    return ComponentWithRouter
}

// const isRequired = value => (
//     !value && "Este campo es requerido"
// )

const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser un número"
)

const validate = values => {
    const error = {};
    if(!values.name){
        error.name = "El campo nombre es requerido";
    }
    if(!values.dni){
        error.dni = "El campo dni es requerido";
    }
    return error;
}

const toNumber = value => value && Number(value)
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previusValue, values) => 
    value && (!previusValue ? value : (value>previusValue?value:previusValue))

class CustomerEdit extends Component{

    componentDidMount(){
        if(this.txt){
            this.txt.focus();
        }
    }

    renderField = ({input, meta, type, label, name, withFocus}) => {
        const controls = {...input, value: input["value"]||""} 
        return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input {...controls}
                type={!type?"text":type}
                ref={withFocus && (txt => this.txt = txt)} />
            {
                meta.touched && meta.error && <span>{meta.error}</span>
            }        
        </div>
        )
    }

    render(){
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;
        // const {name, dni, age} = initialValues;
        return (
        <div>
            <h2>Edición del Cliente</h2>
            <form onSubmit={handleSubmit}>                                  
                <Field 
                    withFocus
                    name='name' 
                    component={this.renderField}
                    type="text"
                    label="Nombre"
                    parse={toUpper}
                    format={toLower}></Field>        
                <Field 
                    name='dni' 
                    component={this.renderField} 
                    type="text"
                    validate={isNumber}
                    label="Dni"></Field>        
                <Field 
                    name='age' 
                    component={this.renderField} 
                    type="number"
                    validate={isNumber}
                    label="Edad"
                    parse={toNumber}
                    normalize={onlyGrow}></Field>       
                <CustomersActions>
                    <button type="submit" disabled={pristine || submitting}>Aceptar</button>    
                    <button type="button" disabled={submitting} onClick={onBack}>Cancelar</button>
                </CustomersActions>
                {/* <Prompt
                    when={!pristine && !submitSucceeded}
                    message="Se perderan los datos si continua"></Prompt>          */}
            </form>
        </div>
        )
    }
}

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired
}

const CustomerEditForm = reduxForm(
    { 
        form: 'CustomerEdit',
        validate 
    })(CustomerEdit)

export default accessControl([CUSTOMER_EDIT])(compose(
    withRouter,              // <-- injects a params prop
    connect(
        (state, { initialValues }) => ({ initialValues })
    ) // <-- props.params accessible
)(CustomerEditForm));

// export default setPropAsInitial(CustomerEditForm)

// export default connect(
//     (state, props) => ({initialValues:props}))(CustomerEditForm)