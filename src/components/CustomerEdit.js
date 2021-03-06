import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux';

function withRouter(Component) {
    function ComponentWithRouter(props) {
        //   debugger;
        return <Component {...props} />
    }
    return ComponentWithRouter
}

const CustomerEdit = ({ name, dni, age }) => {
    return (
        <div>
            <h2>Edición del Cliente</h2>
            <form action="">
                <div>
                    <label htmlFor="name">Nombre</label>
                    <Field name='name' component="input" type="text"></Field>
                </div>
                <div>
                    <label htmlFor="dni">Dni</label>
                    <Field name='dni' component="input" type="text"></Field>
                </div>
                <div>
                    <label htmlFor="age">Edad</label>
                    <Field name='age' component="input" type="number"></Field>
                </div>
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

// export default connect(
//     (state, props) => ({initialValues:props}))(CustomerEditForm)