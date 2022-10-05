import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
      country: "in",
      pageSize : 11,
      category: 'general'
    }
    static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }
    articles = []

    capitalizeFirstLetter = (string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){          // while using the constructor, super() is always use
        super(props);
        console.log("Hellow this is constructor from News.js");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsLetter`;
    }

    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7501a3ee13240e7bca0c34a5d72974a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading : false
        });
    }

    async componentDidMount(){
        this.updateNews();
    }

    handlePrevClick = async ()=>{
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }
    handleNextClick = async ()=>{
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }
    

  render(){
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center my-4">NewsLetter - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          <div className="container ">
              {this.state.loading && <Spinner/>}
          </div>
          <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key ={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,100):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
          </div>
          <div className="container d-flex justify-content-between my-3">
          <button disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
        
      </>
    )
  }
}

export default News