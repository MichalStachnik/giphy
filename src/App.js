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

  // onInputChange(e){
  //   console.log(e.target.value);
  // }
  onInputChange = (e) => {
    this.setState({ searchVal: e.target.value });
  }
  render() {
    return (
      <div>
        <input onKeyUp={this.onInputChange}/>
        <Search value={this.state.searchVal}/>
      </div>
    );
  }
}

export default App;
