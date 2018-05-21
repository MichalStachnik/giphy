import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchVal: ''
    }
  }
  onInputChange = (e) => {
    this.setState({ searchVal: e.target.value });
  }
  onClickClear = () => {
    this.setState({ searchVal: '' });
  }
  render() {
    return (
      <div>
        <div className="container">
          <input placeholder="Search" value={this.state.searchVal} onChange={this.onInputChange}/>
          <div className="clear" onClick={() => this.onClickClear()}>clear</div>
        </div>
        <Search value={this.state.searchVal}/>
      </div>
    );
  }
}

export default App;
