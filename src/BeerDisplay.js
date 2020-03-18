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
        abvGT: undefined,
        ibuGT: undefined,
        food: undefined,
        ibuLT: undefined,
        ebcGT: undefined,
        hops: undefined,
        likedBeers: [],
        addParams: [{param:'ibu_lt', description:'Maximum IBU', action:this.handleParam}, {param:'ebc_gt', description:'Minimum EBC', action:this.handleParam}, {param:'hops', description:'Hops', action:this.handleParam}],
        addedParams: []
    }
    this.fetchData = this.fetchData.bind(this)
  }
  // <label htmlFor="abv_gt">Minimum ABV</label>
  // <input type="text" id="abv_gt" placeholder="minimum ABV" onChange={this.handleAbv} onBlur={this.fetchData}/>
  addParam = e => {
    console.log(e);
    let param = e.target.value;
    console.log('Param', param);
    let index = this.state.addParams.findIndex(addParam => addParam === param);
    let added = this.state.addParams.splice(index, 1);
    this.setState({
      addParams: this.state.addParams,
      addedParams: [...this.state.addedParams, ...added]
    })
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

  handleParam = e => {
    console.log(e.target.value)
    let stateChange = e.target.id;
    this.setState({[stateChange]: e.target.value})
  }

  componentDidMount(){
    this.fetchData();
  }

  async fetchData() {
    // const {abvGT, ibuGT, food, ibuLT, ebcGT, hops} = this.state;
    let paramString = ['abv_gt', 'ibu_gt', 'food', 'ibu_lt', 'ebc_gt', 'hops'];
    let first = true;

    this.setState({
      isLoading: true
    })

    let url = 'https://api.punkapi.com/v2/beers/'

    if(paramString.some(param => this.state[param] !== undefined)){url = url + '?'}

    paramString.forEach(param=> {
      if(this.state[param] !== undefined) {
        if(!first){url=url+'&'}
        url = url + param + '=' + this.state[param]
        if(first){first=false};
      }
    })

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
              <input type="text" id="abv_gt" placeholder="minimum ABV" onChange={this.handleParam} onBlur={this.fetchData}/>
            </div>
          <div className='form-group'>
            <label htmlFor='ibu_gt'>Minimum Ibu</label>
            <input type="text" id="ibu_gt" placeholder="minimum IBU" onChange={this.handleParam} onBlur={this.fetchData} /></div>
          <div className='form-group'>
            <label htmlFor='food'>Food Pairings</label>
            <input placeholder='e.g "beef" "oyster" "spicy"' type="text"id="food" 
            onChange={this.handleParam} onBlur={this.fetchData} />
          </div>
          {this.state.addedParams.map((param, index)=>( 
              <div className='form-group' key={index}>
                <label htmlFor={param.param}>{param.description}</label>
                <input type="text" id={param.param} placeholder={param.description} key={index} onChange={param.action} onBlur={this.fetchData}></input>
              </div>
            ))}

            <select type='select' onChange={this.addParam}>
              <option>Add Parameter</option>
              {this.state.addParams.map((param, index) => (
                <option value={param.param} key={index} > {param.description} </option>
              ))}
            </select>
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