import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import HomeContainer from './containers/HomeContainer';
import CustomersContainer from './containers/CustomersContainer';
import CustomerContainer from './containers/CustomerContainer';
import NewCustomerContainer from './containers/NewCustomerContainer';

class App extends Component {

  renderHome = () => <HomeContainer />

  renderCustomerContainer = () => <CustomerContainer dato="123" />

  renderCustomerListContainer = () => <CustomersContainer />

  renderCustomerNewContainer = () => <NewCustomerContainer />

  render() {
    return (

      // <Router>
      //   <div className="App">
      //     <Link to="/customers">Customers</Link><br />
      //     <Link to="/customers/1">Customer 1</Link>
      //   </div>
      // </Router>
      
      // <Router>
      //   <div>
      //     <Route exact path="/" component={HomeContainer}></Route>
      //     <Route exact path="/customers" component={this.renderCustomerListContainer}></Route>
      //     <Switch>
      //       <Route path="/customers/new" component={this.renderCustomerNewContainer}></Route>
      //       <Route path="/customers/:dni" component={this.renderCustomerContainer}></Route>
      //     </Switch>
      //   </div>
      // </Router>
      <Router>
        <Routes>
          <Route exact path="/" element={this.renderHome()}></Route>
          <Route exact path="/customers" element={this.renderCustomerListContainer()}></Route>
          <Route path="/customers/new" element={this.renderCustomerNewContainer()}></Route>
          <Route path="/customers/:dni" element={this.renderCustomerContainer()}></Route>
          <Route path="/customers/:dni/edit" element={this.renderCustomerContainer()}></Route>
          <Route path="/customers/:dni/del" element={this.renderCustomerContainer()}></Route>
        </Routes>
      </Router>
    )
  };
}

export default App;
