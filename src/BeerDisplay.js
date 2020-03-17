import React from 'react';
import './isloading.css';
import './beer-display.css';
import BeerCard from './BeerCard';
import './form.css';

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
    console.log(e.target.value);
    this.setState({
      food: e.target.value
    })
  }

  componentDidMount(){
    this.fetchData();
  }

  async fetchData() {
    let abv = this.state.abvGT;
    let ibu = this.state.ibuGT;
    let food = this.state.food;
    let first = true;

    this.setState({
      isLoading: true
    })
    let url = 'https://api.punkapi.com/v2/beers/'

    if(abv || ibu || food) {
      url = url + '?'
    }

    if(abv){
      url = url + 'abv_gt=' + abv;
      first = false;
    }

    if(ibu) {
      if(!first){
        url = url + '&';
      }
      url = url + 'ibu_gt=' + ibu;
      first = false;
    }
    if(food){
      if(!first) {
        url = url + '&'
      }
      url = url + 'food=' + food;
      first = false;
    }

    console.log(url);

    let response = await fetch(url)
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
        <h1>Enter your beer preferences:</h1>
        <form>
            <div className="form-group">
              <label for="abv_gt">Minimum ABV</label>
              <input type="text" id="abv_gt" placeholder="minimum ABV" onChange={this.handleAbv} onBlur={this.fetchData}/>
            </div>

          <div className='form-group'>
            <label for='ibu_gt'>Minimum Ibu</label>
            <input type="text" id="ibu_gt" placeholder="minimum IBU" onChange={this.handleIbu} onBlur={this.fetchData} /></div>
          <div className='form-group'>
            <label for='food'>Food Pairings</label>
            <input placeholder='e.g "beef" "oyster" "spicy"' type="text"id="food" onChange={this.handleFood} onBlur={this.fetchData} />
            {/* <select onChange={this.handleFood} onBlur={this.fetchData}>
              <option value="chicken">Chicken</option>
              <option value="crab">Crab</option>
              <option value="beef">Beef</option>
              <option value="spicy">Spicy</option>
              <option value="sweet">Sweet</option>
              <option value="oyster">Oysters</option>
            </select> */}
          </div>
        </form>
        <div className = {(isLoading ? 'isloading' : '')}>
          {(!isLoading && data.length > 0 ? data.map((beer, index) => {
            return <BeerCard 
              key={index}
              abv={beer.abv} 
              description={beer.description}
              image_url={beer.image_url}
              name={beer.name}  
              food_pairing={beer.food_pairing}
              ibu={beer.ibu}
              />}
              ) : '')}
        </div>
        <div>
          {!isLoading && data.error ? (
            <p>Bad request or server error. Check the fields and try again</p>
          ) : ''}
        {!isLoading && data.length === 0 ?  (
                <div>
                  <p>There are no beers that match those parameters</p>
                </div>
              ) : ''}
        </div>
      </div>
    )
  }
}

export default BeerDisplay;