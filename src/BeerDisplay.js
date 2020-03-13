import React from 'react';
import './isloading.css';
import './beer-display.css';
import BeerCard from './BeerCard';

class BeerDisplay extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        data: [],
        isLoading: true,
        abvGT: '',
        ibuGT: '',
        food: ''
    }
    this.fetchData = this.fetchData.bind(this)
  }
  // state = {
  //   data: [],
  //   isLoading: true,
  //   abvGT: '',
  //   ibuGT: '',
  //   food: ''

  // }

  handleAbv = e => {
    this.setState({
      abvGT: e.target.value
    })
  }
  handleIbu = e => {
    this.setState({
      ibuGT: e.target.value
    })
  }
  handleFood = e => {
    this.setState({
      food: e.target.value
    })
  }

  componentDidMount(){
    this.fetchData();
  }

  async fetchData() {
    this.setState({
      isLoading: true
    })
    let URL = 'https://api.punkapi.com/v2/beers/'
    if(this.state.abvGT){
      URL = URL + '?abv_gt=' + this.state.abvGT
    } 
    let response = await fetch(URL)
    let results = await response.json();
    this.setState({
      data: results,
      isLoading: false
    });

  }

  render(){
    const {isLoading, data} = this.state
    return(
      <div className='beer-display'>
        <h1>Beers Go Here</h1>
        <form>
          <input type="text" id="abv_gt" placeholder="minimum ABV" onChange={this.handleAbv} onBlur={this.fetchData}/>
          <input type="text" id="ibu_gt" placeholder="minimum IBU" onChange={this.handleIbu}/>
          <select onChange={this.handleFood}>
            <option value="chicken">Chicken</option>
            <option value="chicken">Crab</option>
            <option value="chicken">Beef</option>
            <option value="chicken">Spicy</option>
            <option value="chicken">Sweet</option>
            <option value="chicken">Oysters</option>
          </select>
        </form>
        <div className = {(isLoading ? 'isloading' : '')}>
          {(!isLoading ? data.map(beer => {
            return <BeerCard 
              abv={beer.abv} 
              description={beer.description}
              image_url={beer.image_url}
              name={beer.name}  
              food_pairing={beer.food_pairing}
              />}
              ) : '')}
          <div></div>
        </div>
      </div>
    )
  }
}

export default BeerDisplay;