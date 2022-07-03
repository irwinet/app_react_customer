import { Component } from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

class App extends Component {

  renderHome = () => <h1>Home</h1>

  renderCustomerContainer = () => <h1>Customer Container</h1>

  renderCustomerListContainer = () => <h1>Customer List Container</h1>

  renderCustomerNewContainer = () => <h1>Customer New Container</h1>

  render() {
    return (

      // <Router>
      //   <div className="App">
      //     <Link to="/customers">Customers</Link><br />
      //     <Link to="/customers/1">Customer 1</Link>
      //   </div>
      // </Router>
      <Router>
        <Routes>
          <Route exact path="/" element={this.renderHome()}></Route>
          <Route exact path="/customers" element={this.renderCustomerListContainer()}></Route>
          <Route exact path="/customers/:dni" element={this.renderCustomerContainer()}></Route>
          <Route exact path="/customers/new" element={this.renderCustomerNewContainer()}></Route>
        </Routes>
      </Router>
    )
  };
}

export default App;
