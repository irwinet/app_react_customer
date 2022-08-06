import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { setPropAsInitial } from '../helpers/setPropsAsInitial';

function withRouter(Component) {
    function ComponentWithRouter(props) {
        //   debugger;
        return <Component {...props} />
    }
    return ComponentWithRouter
}

const isRequired = value => (
    !value && "Este campo es requerido"
)

const isNumber = value => (
    isNaN(Number(value)) && "El campo debe ser un número"
)

const MyField = ({input, meta, type, label, name}) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input {...input} type={!type?"text":type} />
        {
            meta.touched && meta.error && <span>{meta.error}</span>
        }        
    </div>
)

const CustomerEdit = ({ name, dni, age }) => {
    return (
        <div>
            <h2>Edición del Cliente</h2>
            <form action="">                                  
                <Field 
                    name='name' 
                    component={MyField}
                    type="text"
                    validate={isRequired}
                    label="Nombre"></Field>        
                <Field 
                    name='dni' 
                    component={MyField} 
                    type="text"
                    validate={[isRequired, isNumber]}
                    label="Dni"></Field>        
                <Field 
                    name='age' 
                    component={MyField} 
                    type="number"
                    validate={isNumber}
                    label="Edad"></Field>                
            </form>
        </div>
    )
}

CustomerEdit.propTypes = {
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number
}

const CustomerEditForm = reduxForm({ form: 'CustomerEdit' })(CustomerEdit)

export default compose(
    withRouter,              // <-- injects a params prop
    connect(
        (state, { initialValues }) => ({ initialValues })
    ) // <-- props.params accessible
)(CustomerEditForm);

// export default setPropAsInitial(CustomerEditForm)

// export default connect(
//     (state, props) => ({initialValues:props}))(CustomerEditForm)