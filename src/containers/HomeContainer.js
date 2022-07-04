import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const HomeContainer = props => {
  return (
    <div>
        <h1>Home</h1>
        <Link to="/customers">Listado de Clientes</Link>
    </div>
  )
}

HomeContainer.propTypes = {}

export default HomeContainer