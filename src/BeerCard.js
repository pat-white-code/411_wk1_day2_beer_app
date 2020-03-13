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
    const {abv, description, image_url, name, food_pairing} = this.props;
    return(
      <div className='beer-card'>
        <div className="img-container">
          <img alt={`${name} beer`} src={image_url} className="beer-img" />
        </div>
        <div className='info-container'>
          <div className='beer-title'>
            <h1>{name}</h1>
            <h2>ABV: {abv}</h2>
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