import React from 'react';
import './beer-card.css';

export default class BeerCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: false
    }
  }
  handleLike = () => {
    this.setState({
      liked: (!this.state.liked)
    })
  }

  render(){
    const {abv, description, image_url, name, food_pairing, ibu} = this.props;
    return(
      <div className='beer-card'>
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
        <div className={`like-beer ${this.state.liked ? 'liked' : ''}`} onClick={this.handleLike}></div>
      </div>
    )
  }
}