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
    constructor(){
        super();
        console.log("Hellow this is constructor from News.js");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7501a3ee13240e7bca0c34a5d72974a&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading : false
        });
    }

    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7501a3ee13240e7bca0c34a5d72974a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading : true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles});
        this.setState({
            page : this.state.page - 1,
            articles: parsedData.articles,
            loading : false
        })
    }
    handleNextClick = async ()=>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c7501a3ee13240e7bca0c34a5d72974a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading : true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({articles: parsedData.articles});
            this.setState({
                page : this.state.page + 1,
                articles: parsedData.articles,
                loading : false
            })
        }
    }

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center my-4">Top News</h1>
          <div className="container ">
              {this.state.loading && <Spinner/>}
          </div>
          <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key ={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description = {element.description?element.description.slice(0,90):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
          </div>
          <div className="container d-flex justify-content-between my-3">
          <button disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
          <div className="container ">
              {this.state.loading && <Spinner/>}
          </div>
        </div>
        
      </>
    )
  }
}

export default News