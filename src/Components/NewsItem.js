import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title , description, imageUrl ,newsUrl, author , date, source} = this.props;
    return (
      <>
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'93%', zIndex:'1'}}>
          {source?source:""}
          {/* <span className="visually-hidden">unread messages</span> */}
        </span>
            <img src={imageUrl?imageUrl:"https://images.moneycontrol.com/static-mcnews/2022/07/SensexBSENSE-770x433.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p class="card-text"><small class="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
              <a rel="noopener noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
      </>
    )
  }
}

export default NewsItems