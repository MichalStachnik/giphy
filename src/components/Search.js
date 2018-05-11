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
  //one behind in search right now
  componentWillReceiveProps(newProps){
    this.setState({searchVal: newProps.value})
    let url = `http://api.giphy.com/v1/gifs/search?q=${this.state.searchVal}&api_key=TvKQCH3GjnVigxzQ8GipgTTdrXDk6KJS`;
    fetch(url)
      .then(res => res.json())
      .then(myData => this.setState({
        imgArray: myData.data.splice(0,8)
      }, () => console.log('from componentWillReceiveProps',this.state)));
      
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
          {selectedImage ?  <img src={selectedImage.images.fixed_height.url} /> : ''}
          {console.log('this.state',this.state)}
          <div className="gifs">
            <ul>
              {this.state.imgArray.map((image, index) => {
                return (
                  <li key={image.id} className={`gif${index}`}>
                    <img alt="" onClick={() => this.handleImgClick(image)} src={image.images.downsized.url}/>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
    //waiting for http request
    else{
      return(
        <p>waiting</p>
      );
    }
  }
}
export default Search;