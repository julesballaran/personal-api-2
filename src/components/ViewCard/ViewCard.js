import React from 'react'
import back from '../../img/back-card.jpg'

export default function ViewCard (props) {
  return (
    <div className="details-cont">
      <div className="card">
          <img className="card-img" src={props.viewCard.img ? props.viewCard.img : back} alt=""/>
      </div>
      <div className="card-info">Card Info</div>
      <div className="card-details">
          <span className='card-name'>{props.viewCard.name}</span><br/>
          <span className='card-type blue'>{props.viewCard.type}</span><br/>
          <span className='card-atk blue'>{props.viewCard.atk}</span><br/>
          <span className='card-desc'>{props.viewCard.desc}</span>
      </div>
    </div>
  )
}