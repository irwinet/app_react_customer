import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import AppFrame from '../components/AppFrame'
import CustomersActions from '../components/CustomersActions'

/*
<h1>Home</h1>
<Link to="/customers">Listado de Clientes</Link>
*/

const HomeContainer = () => {

    const navigate = useNavigate();

    const handlerClick = () => {
        console.log("handlerClick");
        //this.props.history.push('/customers');        
        navigate('/customers');
    }

    return (
        <div>
            <AppFrame
                header='Home'
                body={
                    <div>
                        <img src='https://e7.pngegg.com/pngimages/1016/440/png-clipart-computer-icons-customer-service-icon-design-user-business-blue-service.png' />
                        <CustomersActions>
                            <button onClick={handlerClick}>Listado de Clientes</button>
                        </CustomersActions>
                    </div>
                }></AppFrame>
        </div>
    )

}

HomeContainer.propTypes = {

}

export default HomeContainer