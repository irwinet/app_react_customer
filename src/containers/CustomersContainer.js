import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppFrame from '../components/AppFrame'
import CustomersList from '../components/CustomersList'
import CustomersActions from '../components/CustomersActions'
import { useNavigate } from 'react-router-dom'
import { fetchCustomers } from '../actions/fetchCustomers'
import { getCustomers } from './../selectors/customers'

class CustomersContainer extends Component {

    componentDidMount() {
        if (this.props.customers.length === 0) {
            this.props.fetchCustomers();
        }
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
                    body={this.renderBody(this.props.customers)}></AppFrame>
            </div>
        )
    }
}

CustomersContainer.propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
};

CustomersContainer.defaultProps = {
    customers: []
};

const mapStateToProps = state => ({
    customers: getCustomers(state)
})

// const mapDispatchToProps = dispatch => ({
//     fetchCustomers: () => dispatch(fetchCustomers())
// })

const mapDispatchToProps = { fetchCustomers };

export default connect(mapStateToProps, mapDispatchToProps)(function (props) {
    const navigate = useNavigate();
    return <CustomersContainer {...props} navigate={navigate} />
})