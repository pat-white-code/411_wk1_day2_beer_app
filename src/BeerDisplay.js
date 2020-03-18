import React from 'react';
import './isloading.css';
import './beer-display.css';
import BeerCard from './BeerCard';
import './form.css';
import './animate.css';
import './likedBeers.css';

class BeerDisplay extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        data: [],
        isLoading: true,
        abvGT: '',
        ibuGT: '',
        food: '',
        likedBeers: []
    }
    this.fetchData = this.fetchData.bind(this)
  }

  addLikedBeer = id => {
    let newBeer = this.state.data.find(beer => beer.id === parseInt(id));
    console.log('ID',id)
    console.log(newBeer);
    this.setState({
      likedBeers: [...this.state.likedBeers, newBeer]
    })
  }
  removeLikedBeer = id => {
    let removeIndex = this.state.likedBeers.findIndex(beer => beer.id === parseInt(id));
    console.log('REMOVE INDEX', removeIndex)
    let spliced = this.state.likedBeers.splice(removeIndex, 1);
    console.log('ID',id)
    console.log('SPLICED', spliced);
    console.log('STATE', this.state.likedBeers);
    this.setState({
      likedBeers: this.state.likedBeers
    })
  }

  isLiked = id => {
    return (this.state.likedBeers.findIndex(element => element.id === parseInt(id)) !== -1);
  }

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
        {this.state.likedBeers.length ? (
          <div className='liked-beers animated slideInRight'>
            <h1>liked beers ({this.state.likedBeers.length})</h1>
            <div className='beer-list'>
              <ul>
              {this.state.likedBeers.map(beer =>(
                <li key={beer.id}>{beer.name}</li>
              ))}
              </ul>
            </div>
          </div>
            ): ''}
        <form>
            <div className="form-group">
              <label htmlFor="abv_gt">Minimum ABV</label>
              <input type="text" id="abv_gt" placeholder="minimum ABV" onChange={this.handleAbv} onBlur={this.fetchData}/>
            </div>
          <div className='form-group'>
            <label htmlFor='ibu_gt'>Minimum Ibu</label>
            <input type="text" id="ibu_gt" placeholder="minimum IBU" onChange={this.handleIbu} onBlur={this.fetchData} /></div>
          <div className='form-group'>
            <label htmlFor='food'>Food Pairings</label>
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
              id={beer.id}
              animateDelay={index*300}
              key={index}
              abv={beer.abv} 
              description={beer.description}
              image_url={beer.image_url}
              name={beer.name}  
              food_pairing={beer.food_pairing}
              ibu={beer.ibu}
              addLikedBeer={this.addLikedBeer}
              removeLikedBeer={this.removeLikedBeer}
              isLiked = {this.isLiked}
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