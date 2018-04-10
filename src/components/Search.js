import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgArray: [],
      searchVal: 'funny cat',
      selectedImg: null
    }
  }
  componentWillReceiveProps(newProps){
    this.setState({searchVal: newProps.value})
    let url = `http://api.giphy.com/v1/gifs/search?q=${this.state.searchVal}&api_key=TvKQCH3GjnVigxzQ8GipgTTdrXDk6KJS`;
    fetch(url)
      .then(res => res.json())
      .then(myData => this.setState({
        imgArray: myData.data
      }, () => console.log('from componentWillReceiveProps',this.state)));
  }
  componentWillMount() {
    let url = `http://api.giphy.com/v1/gifs/search?q=${this.state.searchVal}&api_key=TvKQCH3GjnVigxzQ8GipgTTdrXDk6KJS`;
    fetch(url)
      .then(res => res.json())
      .then(myData => this.setState({
        imgArray: myData.data
      }, () => console.log('from componentWillMount',this.state)));
  }
  handleImgClick = (img) => {
    console.log(img);
    this.setState({selectedImg: img});
    console.log(this.state);
  }

  render() {
    let selectedImage = this.state.selectedImg;
    
    if(this.state.imgArray.length > 0){
      return(
        <div>
          {selectedImage ?  <img src={selectedImage.images.fixed_height.url} /> : 'nonthing'}
          <h1>from search: {this.props.value}</h1>
          {console.log('this.state',this.state)}
          <ul>
            {this.state.imgArray.map((image) => {
              return <img alt="" width="100" onClick={() => this.handleImgClick(image)} key={image.id} src={image.images.downsized.url}/>;
            })}
          </ul>
        </div>
      );
    }
    //waiting for http request
    else{
      return(
        <p>still loading</p>
      );
    }
  }
}
export default Search;