import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title , description, imageUrl ,newsUrl} = this.props;
    return (
      <>
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl?imageUrl:"https://images.moneycontrol.com/static-mcnews/2022/07/SensexBSENSE-770x433.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a rel="noreferrer"href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
      </>
    )
  }
}

export default NewsItems