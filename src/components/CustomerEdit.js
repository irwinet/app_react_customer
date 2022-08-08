import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { setPropAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './CustomersActions'
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

const MyField = ({input, meta, type, label, name}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type={!type?"text":type} />
        {
            meta.touched && meta.error && <span>{meta.error}</span>
        }        
    </div>
)

const toNumber = value => value && Number(value)
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previusValue, values) => 
    value && (!previusValue ? value : (value>previusValue?value:previusValue))

const CustomerEdit = ({ name, dni, age, handleSubmit, submitting, onBack, pristine, submitSucceeded }) => {
    return (
        <div>
            <h2>Edición del Cliente</h2>
            <form onSubmit={handleSubmit}>                                  
                <Field 
                    name='name' 
                    component={MyField}
                    type="text"
                    label="Nombre"
                    parse={toUpper}
                    format={toLower}></Field>        
                <Field 
                    name='dni' 
                    component={MyField} 
                    type="text"
                    validate={isNumber}
                    label="Dni"></Field>        
                <Field 
                    name='age' 
                    component={MyField} 
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

export default compose(
    withRouter,              // <-- injects a params prop
    connect(
        (state, { initialValues }) => ({ initialValues })
    ) // <-- props.params accessible
)(CustomerEditForm);

// export default setPropAsInitial(CustomerEditForm)

// export default connect(
//     (state, props) => ({initialValues:props}))(CustomerEditForm)