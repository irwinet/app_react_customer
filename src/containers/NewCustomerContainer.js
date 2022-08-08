import PropTypes from "prop-types";
import React, { Component } from "react";
import AppFrame from "../components/AppFrame";
import CustomerEdit from "../components/CustomerEdit";
import { compose } from 'redux';
import { connect } from 'react-redux'
import { Route, Router, Routes, useParams, useNavigate, useLocation } from 'react-router-dom';
import {insertCustomer} from './../actions/insertCustomer';
import { SubmissionError } from 'redux-form';

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
  handleSubmit = (values) => {
    return this.props.insertCustomer(values).then(r => {
        if(r.payload && r.payload.error){
            throw new SubmissionError(r.payload)
        }
    });
  };

  handleOnSubmitSuccess = () => this.props.navigate(-1);

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

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired
};

// export default NewCustomerContainer;

export default compose(
    withRouter,
    connect(null,{
        insertCustomer
    })
  )(NewCustomerContainer);
