import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import HomeContainer from './containers/HomeContainer';

class App extends Component {

  renderHome = () => <HomeContainer />

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
        </Routes>
      </Router>
    )
  };
}

export default App;
