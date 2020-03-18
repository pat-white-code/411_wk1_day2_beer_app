import React from 'react';
import './beer-card.css';

export default class BeerCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: false
    }
  }

  componentDidMount(){
    const {isLiked, id} = this.props;
    if(isLiked(id)) {
      this.setState({liked: true})
    } 
  }

  handleLike = (e) => {
    const {addLikedBeer, removeLikedBeer} = this.props;
    let id = e.target.dataset.id
    !this.state.liked ? addLikedBeer(id) : removeLikedBeer(id);
    this.setState({
      liked: (!this.state.liked)
    })
    // addLikedBeer(e.target.data.set.id)
  }

  render(){
    const {abv, description, image_url, name, food_pairing, ibu, animateDelay, id} = this.props;
    return(
      <div className={`beer-card animated slideInRight delay-${animateDelay}ms`}>
        <div className="img-container">
          <img alt={`${name} beer`} src={image_url} className="beer-img" />
        </div>
        <div className='info-container'>
          <div className='beer-title'>
            <h1>{name}</h1>
            <div className='beer-stats'>
              <h2 className='stat'>ABV: {abv}</h2>
              <h3 className='stat'>IBU: {ibu}</h3>
            </div>
          </div>
          <div className='description'>
            <p>{description}</p>
            <ul>
            {food_pairing.map((food, index)=> <li key={index}>{food}</li>)}
          </ul>
          </div>
        </div>
        <div className={`like-beer ${this.state.liked ? 'liked' : ''}`} data-id={id} onClick={this.handleLike}></div>
      </div>
    )
  }
}