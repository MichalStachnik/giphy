import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgArray: [],
      searchVal: 'funny cat',
      selectedImg: null,
      opacity: 0
    }
  }
  componentWillReceiveProps(newProps){
    this.setState({searchVal: newProps.value}, () => {
      let url = `http://api.giphy.com/v1/gifs/search?q=${this.state.searchVal}&api_key=TvKQCH3GjnVigxzQ8GipgTTdrXDk6KJS`;
      fetch(url)
        .then(res => res.json())
        .then(myData => this.setState({
          imgArray: myData.data.splice(0,8)
        }));
    });
  }
  handleImgClick = (img) => {
    this.setState({
      selectedImg: img,
      opacity: 1,
      zIndex: 5
    });
  }
  unselectImg = () => {
    this.setState({
      opacity: 0,
      zIndex: -5
    });
  }
  render() {
    if(this.state.imgArray.length > 0){
      return(
        <div>
        <div 
          className="modalContainer"
          style={{ opacity: this.state.opacity, zIndex: this.state.zIndex }}
        >
          {this.state.selectedImg ?  
            <img
              className="modalImg"
              onClick={() => this.unselectImg()} 
              alt="" 
              src={this.state.selectedImg.images.fixed_height.url} 
            /> 
            : ''}
          </div>
          <div className="gifs">
            <ul>
              {this.state.imgArray.map((image, index) => {
                return (
                  <li key={image.id} className={`gif${index}`}>
                    <img 
                      alt="" 
                      onClick={() => this.handleImgClick(image)} 
                      src={image.images.downsized.url}
                    />
                    <p><em>Uploaded at: </em></p>
                    <p>{image.import_datetime}</p>
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
        <p className="mt-15">no results</p>
      );
    }
  }
}
export default Search;