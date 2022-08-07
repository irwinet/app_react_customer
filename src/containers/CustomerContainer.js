import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppFrame from './../components/AppFrame'
import { Route, Router, Routes, useParams, useNavigate, useLocation } from 'react-router-dom';
import { getCustomerByDni, getCustomers } from './../selectors/customers'
import { compose } from 'redux';
import CustomerEdit from './../components/CustomerEdit'
import CustomerData from './../components/CustomerData'
import {fetchCustomers} from './../actions/fetchCustomers';
import {updateCustomer} from './../actions/updateCustomer';

function withRouter(Component) {
    function ComponentWithRouter(props) {
      let params = useParams()      
      const location = useLocation();
      const navigate = useNavigate();
    //   debugger;
      return <Component {...props} params={params} location={location} navigate={navigate} />
    }
    return ComponentWithRouter
}

class CustomerContainer extends Component {

    componentDidMount(){
        if(!this.props.customer){
            this.props.fetchCustomers();
        }
    }

    handleSubmit = values => {
        console.log(JSON.stringify(values));
        const {id} = values;
        return this.props.updateCustomer(id, values);
    }

    handleOnBack = () => this.props.navigate('/customers');

    handleOnSubmitSuccess= () => this.props.navigate(-1);

    renderBody = () => {

        // debugger;
        const CustomerControl = this.props.location.pathname.includes('edit') ? CustomerEdit: CustomerData;
        return <CustomerControl 
            initialValues={this.props.customer} 
            onSubmit={this.handleSubmit}
            onSubmitSuccess={this.handleOnSubmitSuccess}
            onBack={this.handleOnBack} />
        
        // <Routes>
        //     <Route exact path='/customers/:dni' children={() => <p>No es edicion</p>} />
        //     <Route exact path='/customers/:dni/edit' children={
        //         ({match}) => (match ? <CustomerEdit />: <CustomerData />)
        //     } />
        // </Routes>
    }                                    

    //<p>Datos del cliente {this.props.customer.name}</p>
    render() {
        return (
            <AppFrame header={`Cliente ${this.props.params.dni}`}
                body={this.renderBody()}>

            </AppFrame>
        )
    }
}

// const CustomerContainer = () => {
//     const { dni } = useParams();

//     return (
//         <AppFrame header={`Cliente ${dni}`}
//             body={<p>Datos del cliente</p>}>

//         </AppFrame>
//     )
// }

CustomerContainer.propTypes = {
    //dni: PropTypes.string.isRequired,
    //customer: PropTypes.object.isRequired,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired
}

const mapStateToProps = (state, { params }) => ({
    customer: getCustomerByDni(state, params)
});

//export default connect(mapStateToProps, null)(withRouter(CustomerContainer))

export default compose(
    withRouter,              // <-- injects a params prop
    connect(mapStateToProps, {
        fetchCustomers,
        updateCustomer
    }) // <-- props.params accessible
  )(CustomerContainer);

// export default compose(
//         withRouter,              // <-- injects a params prop
//         connect(mapStateToProps) // <-- props.params accessible
//       )(function (props) {
//     //const { dni } = useParams();    
//     const navigate = useNavigate();
//     debugger;
//     return <CustomerContainer {...props} navigate={navigate} />
// })

// export default connect(mapStateToProps, null)(function (props) {
//     const { dni } = useParams();    
    
//     return <CustomerContainer {...props} dni={dni} />
// })