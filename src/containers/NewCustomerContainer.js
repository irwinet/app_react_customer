import PropTypes from "prop-types";
import React, { Component } from "react";
import AppFrame from "../components/AppFrame";
import CustomerEdit from "../components/CustomerEdit";
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Route, Router, Routes, useParams, useNavigate, useLocation } from 'react-router-dom';

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

class NewCustomerContainer extends Component {
  handleSubmit = () => {};

  handleOnSubmitSuccess = () => {};

  handleOnBack = () => {
    var answer = window.confirm("Se perderan los datos si continua");
    if(answer){        
        this.props.navigate('/customers');
    } 
  };

  renderBody = () => {
    return (
      <CustomerEdit
        onSubmit={this.handleSubmit}
        onSubmitSuccess={this.handleOnSubmitSuccess}
        onBack={this.handleOnBack}
      ></CustomerEdit>
    );
  };

  render() {
    return (
      <div>
        <AppFrame
          header={"Creacion de nuevo cliente"}
          body={this.renderBody()}
        ></AppFrame>
      </div>
    );
  }
}

NewCustomerContainer.propTypes = {};

// export default NewCustomerContainer;

export default compose(
    withRouter,
    connect(null,null)
  )(NewCustomerContainer);
