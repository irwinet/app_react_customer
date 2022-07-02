import { Component } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/customers">Customers</Link><br />
          <Link to="/customers/1">Customer 1</Link>
        </div>
      </Router>
    )
  };
}

export default App;
