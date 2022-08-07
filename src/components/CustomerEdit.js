import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { setPropAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './CustomersActions'

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

const CustomerEdit = ({ name, dni, age, handleSubmit, submitting }) => {
    return (
        <div>
            <h2>Edición del Cliente</h2>
            <form onSubmit={handleSubmit}>                                  
                <Field 
                    name='name' 
                    component={MyField}
                    type="text"
                    label="Nombre"></Field>        
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
                    label="Edad"></Field>       
                <CustomersActions>
                    <button type="submit" disabled={submitting}>Aceptar</button>    
                </CustomersActions>         
            </form>
        </div>
    )
}

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number
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