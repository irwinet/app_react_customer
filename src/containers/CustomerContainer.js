import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppFrame from './../components/AppFrame'
import { useParams } from 'react-router-dom';
import { getCustomers } from './../selectors/customers'
import { compose } from 'redux';

function withRouter(Component) {
    function ComponentWithRouter(props) {
      let params = useParams()
    //   debugger;
      return <Component {...props} params={params} />
    }
    return ComponentWithRouter
  }

class CustomerContainer extends Component {
    render() {
        return (
            <AppFrame header={`Cliente ${this.props.params.dni}`}
                body={<p>Datos del cliente {this.props.customer.name}</p>}>

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
    customer: getCustomers(state).find(c => c.dni === params.dni)
});

//export default connect(mapStateToProps, null)(withRouter(CustomerContainer))

export default compose(
    withRouter,              // <-- injects a params prop
    connect(mapStateToProps) // <-- props.params accessible
  )(CustomerContainer);

// export default connect(mapStateToProps, null)(function (props) {
//     const { dni } = useParams();    
    
//     return <CustomerContainer {...props} dni={dni} />
// })