import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppFrame from '../components/AppFrame'
import CustomersList from '../components/CustomersList'
import CustomersActions from '../components/CustomersActions'
import { useNavigate } from 'react-router-dom'
import { fetchCustomers } from '../actions/fetchCustomers'

const customers = [
    {
        "dni": "76173874",
        "name": "Irwin Estrada",
        "age": 28
    },
    {
        "dni": "11111111",
        "name": "Qwerty Qwerty",
        "age": 30
    },
    {
        "dni": "22222222",
        "name": "Azerty Azerty",
        "age": 35
    }
];

export class CustomersContainer extends Component {

    componentDidMount() {
        this.props.fetchCustomers();
    }

    handlerAddNew = () => {
        const { navigate } = this.props;
        navigate('/customers/new');
    }

    renderBody = (customers) => (
        <div>
            <CustomersList
                customers={customers}
                urlPath={'/customers/'}>
            </CustomersList>

            <CustomersActions>
                <button onClick={this.handlerAddNew}>Nuevo Cliente</button>
            </CustomersActions>
        </div>
    )

    render() {
        return (
            <div>
                <AppFrame
                    header='Listado de Clientes'
                    body={this.renderBody(customers)}></AppFrame>
            </div>
        )
    }
}

CustomersContainer.propTypes = {
    fetchCustomers: PropTypes.func.isRequired
};

// const mapDispatchToProps = dispatch => ({
//     fetchCustomers: () => dispatch(fetchCustomers())
// })

const mapDispatchToProps = { fetchCustomers };

export default connect(null, mapDispatchToProps)(function (props) {
    const navigate = useNavigate();
    return <CustomersContainer {...props} navigate={navigate} />
})