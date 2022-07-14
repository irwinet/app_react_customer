import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppFrame from './../components/AppFrame'
import { Route, Router, Routes, useParams, useNavigate, useLocation } from 'react-router-dom';
import { getCustomerByDni, getCustomers } from './../selectors/customers'
import { compose } from 'redux';
import CustomerEdit from './../components/CustomerEdit'
import CustomerData from './../components/CustomerData'

function withRouter(Component) {
    function ComponentWithRouter(props) {
      let params = useParams()      
      const location = useLocation();
    //   debugger;
      return <Component {...props} params={params} location={location} />
    }
    return ComponentWithRouter
}

class CustomerContainer extends Component {

    renderBody = () => {

        // debugger;
        const CustomerControl = this.props.location.pathname.includes('edit') ? CustomerEdit: CustomerData;
        return <CustomerControl initialValues={this.props.customer} />
        
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
    //customer: PropTypes.object.isRequired
}

const mapStateToProps = (state, { params }) => ({
    customer: getCustomerByDni(state, params)
});

//export default connect(mapStateToProps, null)(withRouter(CustomerContainer))

export default compose(
    withRouter,              // <-- injects a params prop
    connect(mapStateToProps) // <-- props.params accessible
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