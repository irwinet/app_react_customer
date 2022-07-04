import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AppFrame from '../components/AppFrame'
import CustomersActions from '../components/CustomersActions'

/*
<h1>Home</h1>
<Link to="/customers">Listado de Clientes</Link>
*/

class HomeContainer extends Component {

    handlerClick = () => {
        console.log("handlerClick")
    }

    render() {
        return (
            <div>
                <AppFrame
                    header='Home'
                    body={
                        <div>
                            Esta es la Pantalla Inicial
                            <CustomersActions>
                                <button onClick={this.handlerClick}>Listado de Clientes</button>
                            </CustomersActions>
                        </div>
                    }></AppFrame>
            </div>
        )
    }
}

HomeContainer.propTypes = {

}

export default HomeContainer