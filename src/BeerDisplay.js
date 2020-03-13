import React from 'react';
import './isloading.css';
import './beer-display.css';

class BeerDisplay extends React.Component {
  state = {
    data: [],
    isLoading: true
  }

  componentDidMount(){
    this.fetchData();
  }

  async fetchData(){
    let URL = 'https://api.punkapi.com/v2/beers/'
    let response = await fetch(URL)
    let results = await response.json();
    this.setState({
      data: results,
      isLoading: false
    });

    // let optionsArr = [[abv_gt.value, 'abv_gt='],[ibu_gt.value, 'ibu_gt='],[food.value, 'food=']]
    // let url = composeURL(optionsArr, URL);
    // console.log(url);
    // let response = await fetch(url);
    // let results = await response.json();
    // let beers = results;
    // displayBeers(beers);
    // console.log(beers);

  }

  render(){
    const {isLoading, data} = this.state
    return(
      <div className='beer-display'>
      <h1>Beers Go Here</h1>
        <div className = {(isLoading ? 'isloading' : '')}>
          {(!isLoading ? data.map(beer => <li>{beer.name}</li>) : '')}
          <div></div>
        </div>
      </div>
    )
  }
}

export default BeerDisplay;