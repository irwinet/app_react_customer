import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux';
import { connect } from 'react-redux'
import CustomersActions from './CustomersActions'

function withRouter(Component) {
    function ComponentWithRouter(props) {
        //   debugger;
        return <Component {...props} {...props.initialValues} />
    }
    return ComponentWithRouter
}

const CustomerData = ({ id, name, dni, age, onBack, isDeleteAllow, onDelete }) => {
    return (
        <div>
            <div className='customer-data'>
                <h2>Datos del Cliente</h2>
                <div>
                    <strong>Nombre: </strong>
                    <i>{name}</i>
                </div>
                <div>
                    <strong>Dni: </strong>
                    <i>{dni}</i>
                </div>
                <div>
                    <strong>Edad: </strong>
                    <i>{age}</i>
                </div>
            </div>
            <CustomersActions>  
                    <button onClick={onBack}>Volver</button>
                    {
                        isDeleteAllow && <button onClick={() => onDelete(id)}>Eliminar</button>
                    }
            </CustomersActions>  
        </div>
    )
}

CustomerData.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    dni: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    isDeleteAllow: PropTypes.bool
}

export default compose(
    withRouter,              // <-- injects a params prop
    connect(
        (state, { initialValues }) => ({ initialValues })
    ) // <-- props.params accessible
)(CustomerData);

// export default CustomerData